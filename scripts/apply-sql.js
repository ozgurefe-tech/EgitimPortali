import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mysql from 'mysql2/promise'

const projectDir = process.cwd()
const schemaPath = path.join(projectDir, 'database', 'schema.sql')
const seedPath = path.join(projectDir, 'database', 'seed.sql')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 5,
  multipleStatements: true,
})

async function applyFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8')
  console.log(`Applying ${filePath}...`)
  try {
    await pool.query(sql)
    console.log(`Applied ${filePath}`)
  } catch (err) {
    console.error(`Failed to apply ${filePath}:`, err.message)
    throw err
  }
}

async function run() {
  try {
    // If tables already exist, skip schema and only apply seed
    let needSchema = true
    try {
      await pool.query('SELECT 1 FROM users LIMIT 1')
      needSchema = false
    } catch (e) {
      needSchema = true
    }

    if (needSchema) {
      await applyFile(schemaPath)
    } else {
      console.log('Schema appears to exist, skipping schema.sql')
    }
    await applyFile(seedPath)
    const [[{events}]] = await pool.query("SELECT COUNT(*) AS events FROM events")
    const [[{trainings}]] = await pool.query("SELECT COUNT(*) AS trainings FROM trainings")
    const [[{pages}]] = await pool.query("SELECT COUNT(*) AS pages FROM pages")
    console.log(JSON.stringify({ events, trainings, pages }, null, 2))
  } catch (err) {
    console.error('Error applying SQL:', err.message)
    process.exit(2)
  } finally {
    await pool.end()
  }
}

run()
