const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "t47_products",
  user: "postgres",
  password: "Bhumi_1102",
});

module.exports = pool;