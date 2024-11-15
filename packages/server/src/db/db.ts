import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

// Initialize Sequelize using environment variables
const db = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    dialect: 'postgres',
    logging: false, // Disable logging
    define: {
      timestamps: false, // Disable timestamps by default
    },
    pool: {
      max: 10, // Maximal count of connections in pool
      min: 0, // Minimal count of connections in pool
      acquire: 30000, // Time to wait for connection (ms)
      idle: 10000, // Time to wait before closing connection (ms)
    },
  },
)

db.authenticate()
  .then(() => {
    console.log('🎸 Подключение к базе данных успешно установлено.')
  })
  .catch((err: Error) => {
    console.error('Невозможно подключиться к базе данных:', err)
    process.exit(1)
  })

export default db
