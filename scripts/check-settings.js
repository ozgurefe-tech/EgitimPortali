require('dotenv/config')
const mysql = require('mysql2/promise')
;(async ()=>{
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectionLimit: 5
    })
    const [rows] = await pool.query('SELECT `key`, `value`, `type`, label, updated_at FROM settings ORDER BY `key`')
    console.log(JSON.stringify(rows, null, 2))
    await pool.end()
  } catch (e) { console.error('ERROR:', e.message); process.exit(1) }
})()
