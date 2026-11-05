const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "t50_mvcc",
  user: "postgres",
  password: process.env.PGPASSWORD,
});

module.exports = pool;