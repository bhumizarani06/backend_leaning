
require("dotenv").config();
const mysql = require("mysql2/promise");

const TOTAL = 50000;
const BATCH_SIZE = 1000;

function getCategory(id) {
  if (id <= 25000) return "Electronics";
  if (id <= 37000) return "Clothing";
  if (id <= 45000) return "Grocery";
  if (id <= 48000) return "Furniture";
  return "Books";
}

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [[row]] = await connection.query(
      "SELECT COUNT(*) AS total FROM products"
    );

    if (Number(row.total) !== 0) {
      throw new Error(
        `Products table already has ${row.total} rows. Stopping to avoid duplicates.`
      );
    }

    for (let start = 1; start <= TOTAL; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE - 1, TOTAL);
      const values = [];

      for (let id = start; id <= end; id++) {
        const category = getCategory(id);
        const price = 100 + ((id * 37) % 99000) / 100;
        const stock = id % 201;

        values.push([
          `SKU-${String(id).padStart(6, "0")}`,
          `Product ${id}`,
          category,
          price.toFixed(2),
          stock,
        ]);
      }

      await connection.query(
        `INSERT INTO products (sku, name, category, price, stock)
         VALUES ?`,
        [values]
      );

      console.log(`Inserted ${end} / ${TOTAL}`);
    }

    console.log("Seeding complete!");
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exitCode = 1;
});
