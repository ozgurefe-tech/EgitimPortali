import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const required = ['DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD']
const missing = required.filter((key) => !process.env[key])
if (missing.length) throw new Error(`Eksik .env değişkenleri: ${missing.join(', ')}`)

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
})

const queries = {
  'Hakkında': `SELECT id, title, status, updated_at FROM pages WHERE page_type = 'about' ORDER BY updated_at DESC`,
  'Eğitimler': `SELECT id, title, status, start_date AS detail, updated_at FROM trainings ORDER BY created_at DESC`,
  'Planlanan Etkinlikler': `SELECT id, title, status, start_at AS detail, updated_at FROM events WHERE start_at >= CURDATE() ORDER BY start_at`,
  'Geçmiş Etkinlikler': `SELECT id, title, status, start_at AS detail, updated_at FROM events WHERE start_at < CURDATE() ORDER BY start_at DESC`,
  'Kişiler': `SELECT id, full_name AS title, title AS detail, is_visible AS status, updated_at FROM people ORDER BY display_order`,
  'Ofisler': `SELECT id, name AS title, city AS detail, is_active AS status, updated_at FROM offices ORDER BY city`,
  'Başvuru': `SELECT a.id, a.full_name AS title, t.title AS detail, a.status, a.created_at AS updated_at FROM applications a LEFT JOIN trainings t ON t.id = a.training_id ORDER BY a.created_at DESC`,
  'Yorumlar': `SELECT c.id, c.full_name AS title, t.title AS detail, c.status, c.created_at AS updated_at FROM comments c LEFT JOIN trainings t ON t.id = c.training_id ORDER BY c.created_at DESC`,
  'İletişim': `SELECT id, full_name AS title, subject AS detail, is_read AS status, created_at AS updated_at FROM contact_messages ORDER BY created_at DESC`,
  'Hesap Ayarları': `SELECT id, full_name AS title, role AS detail, is_active AS status, updated_at FROM users ORDER BY full_name`,
  'Hesap Ayarlar': `SELECT id, full_name AS title, role AS detail, is_active AS status, updated_at FROM users ORDER BY full_name`,
  // Genel Ayarlar için şimdilik duyurular örnek veri olarak dönülüyor
  'Genel Ayarlar': `SELECT id, title AS title, body AS detail, is_published AS status, published_at AS updated_at FROM announcements ORDER BY created_at DESC`,
}



const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', async (_req, res, next) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true }) } catch (error) { next(error) }
})

// Settings endpoints
app.get('/api/settings', async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT `key`, label, `value`, `type`, updated_at FROM settings ORDER BY `key`")
    res.json({ items: rows })
  } catch (err) { next(err) }
})

app.put('/api/settings/:key', async (req, res, next) => {
  const key = req.params.key
  const { value } = req.body
  try {
    const [result] = await pool.query('UPDATE settings SET `value` = ? WHERE `key` = ?', [String(value), key])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ayar bulunamadı.' })
    const [[row]] = await pool.query('SELECT `key`, label, `value`, `type`, updated_at FROM settings WHERE `key` = ?', [key])
    res.json({ item: row })
  } catch (err) { next(err) }
})

app.get('/api/sections', (_req, res) => {
  res.json({ sections: Object.keys(queries) })
})

const CURRENT_USER_ID = Number(process.env.CURRENT_USER_ID || 1)

// Current user endpoints (mock session)
app.get('/api/me', async (_req, res, next) => {
  try {
    const [[user]] = await pool.query('SELECT id, full_name, email, role, is_active, updated_at FROM users WHERE id = ?', [CURRENT_USER_ID])
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' })
    res.json({ user })
  } catch (err) { next(err) }
})

app.put('/api/me', async (req, res, next) => {
  const { full_name, email, avatar_url } = req.body
  if (!full_name || typeof full_name !== 'string' || full_name.length < 2) return res.status(400).json({ error: 'Geçersiz isim.' })
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  if (!email || !emailRegex.test(email)) return res.status(400).json({ error: 'Geçersiz e-posta.' })
  try {
    const [result] = await pool.query('UPDATE users SET full_name = ?, email = ?, avatar_url = ? WHERE id = ?', [full_name, email, avatar_url || null, CURRENT_USER_ID])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Güncelleme başarısız.' })
    const [[user]] = await pool.query('SELECT id, full_name, email, role, is_active, updated_at FROM users WHERE id = ?', [CURRENT_USER_ID])
    res.json({ user })
  } catch (err) { next(err) }
})

app.post('/api/me/password', async (req, res, next) => {
  const { current_password, new_password } = req.body
  if (!current_password || !new_password || new_password.length < 8) return res.status(400).json({ error: 'Şifre kısa veya eksik.' })
  try {
    const [[user]] = await pool.query('SELECT id, password_hash FROM users WHERE id = ?', [CURRENT_USER_ID])
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' })
    const matches = await bcrypt.compare(current_password, user.password_hash || '')
    if (!matches) return res.status(403).json({ error: 'Mevcut şifre yanlış.' })
    const newHash = await bcrypt.hash(new_password, 10)
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, CURRENT_USER_ID])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

app.get('/api/content/:section', async (req, res, next) => {
  const query = queries[req.params.section]
  if (!query) return res.status(404).json({ error: 'Bu bölüm için veri kaynağı bulunamadı.' })
  try {
    const [items] = await pool.query(query)
    res.json({ items })
  } catch (error) { next(error) }
})

app.use((error, _req, res, _next) => {
  console.error(error.message)
  res.status(500).json({ error: 'Veritabanı bağlantısı kurulamadı.' })
})

const port = Number(process.env.API_PORT || 3001)
app.listen(port, () => console.log(`API hazır: http://127.0.0.1:${port}`))
