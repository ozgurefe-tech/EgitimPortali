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

async function run() {
  try {
    const [[{events}]] = await pool.query("SELECT COUNT(*) AS events FROM events")
    const [[{trainings}]] = await pool.query("SELECT COUNT(*) AS trainings FROM trainings")
    const [[{pages}]] = await pool.query("SELECT COUNT(*) AS pages FROM pages")
    const [[sampleEvent]] = await pool.query("SELECT id,title,start_at FROM events ORDER BY start_at LIMIT 1")
    console.log(JSON.stringify({ events, trainings, pages, sampleEvent }, null, 2))
  } catch (err) {
    console.error('DB query failed:', err.message)
    process.exit(2)
  } finally {
    await pool.end()
  }
}

run()
