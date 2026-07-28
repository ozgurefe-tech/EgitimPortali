import 'dotenv/config'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 5,
})

const settings = [
  { key: 'site_title', label: 'Site Başlığı', value: 'ODTÜ KALTEV', type: 'string' },
  { key: 'default_language', label: 'Varsayılan Dil', value: 'tr', type: 'string' },
  { key: 'items_per_page', label: 'Sayfa başına öğe', value: '10', type: 'number' },
  { key: 'maintenance_mode', label: 'Bakım Modu', value: '0', type: 'boolean' },
]

async function run() {
  try {
    const createSql = `CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(100) NOT NULL PRIMARY KEY,
      label VARCHAR(200) NOT NULL,
      \`value\` TEXT NULL,
      \`type\` ENUM('string','boolean','number') NOT NULL DEFAULT 'string',
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB`
    await pool.query(createSql)

    for (const s of settings) {
      await pool.query('INSERT INTO settings (`key`, label, `value`, `type`) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE label = VALUES(label), `value` = VALUES(`value`), `type` = VALUES(`type`)', [s.key, s.label, s.value, s.type])
    }
    const [rows] = await pool.query('SELECT `key`, label, `value`, `type`, updated_at FROM settings')
    console.log(JSON.stringify(rows, null, 2))
  } catch (err) {
    console.error('Failed to seed settings:', err.message)
    process.exit(2)
  } finally {
    await pool.end()
  }
}

run()
