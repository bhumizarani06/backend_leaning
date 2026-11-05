const pool = require("../config/db");

let readCount = 0;
let releaseBarrier;

const barrier = new Promise((resolve) => {
  releaseBarrier = resolve;
});

async function runTransaction(customer) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");

    const result = await client.query(
      "SELECT stock FROM products WHERE id = 1"
    );

    console.log(customer, "read stock:", result.rows[0].stock);

    readCount++;

    if (readCount === 2) {
      releaseBarrier();
    }

    await barrier;

    await client.query(
      "UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0"
    );

    await client.query("COMMIT");

    console.log(customer, "committed successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(customer, "failed:", error.code, error.message);
  } finally {
    client.release();
  }
}

async function runConflictTest() {
  try {
    await Promise.all([
      runTransaction("Customer A"),
      runTransaction("Customer B"),
    ]);
  } finally {
    await pool.end();
  }
}

runConflictTest();