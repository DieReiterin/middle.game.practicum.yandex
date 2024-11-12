require('dotenv').config();

const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres',
};

module.exports = {
  development: config,
  production: config,
  test: config,
};
