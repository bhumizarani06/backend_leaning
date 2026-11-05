const pool = require("../config/db");

let readCount = 0;
let releaseBarrier;

const barrier = new Promise((resolve) => {
  releaseBarrier = resolve;
});

const sentReceipts = new Set();

async function sendReceiptOnce(customer) {
  if (sentReceipts.has(customer)) {
    return;
  }

  sentReceipts.add(customer);
  console.log("Receipt sent to:", customer);
}

async function placeOrderWithRetry(customer, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const client = await pool.connect();

    try {
      console.log(`${customer} - Attempt ${attempt}`);

      await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");

      const result = await client.query(
        "SELECT stock FROM products WHERE id = 1"
      );

      console.log(customer, "read stock:", result.rows[0].stock);

      if (readCount < 2) {
        readCount++;

        if (readCount === 2) {
          releaseBarrier();
        }

        await barrier;
      }

      const update = await client.query(
        `UPDATE products
         SET stock = stock - 1
         WHERE id = 1 AND stock > 0
         RETURNING stock`
      );

      if (update.rowCount === 0) {
        throw new Error("Out of stock");
      }

      await client.query("COMMIT");

      console.log(customer, "order committed");

      await sendReceiptOnce(customer);

      return;
    } catch (error) {
      await client.query("ROLLBACK");

      console.log(customer, "failed:", error.code || error.message);

      if (
        (error.code === "40001" || error.code === "40P01") &&
        attempt < maxAttempts
      ) {
        console.log(customer, "retrying whole transaction...");
        continue;
      }

      throw error;
    } finally {
      client.release();
    }
  }
}

async function runRetryTest() {
  try {
    const results = await Promise.allSettled([
      placeOrderWithRetry("Customer A"),
      placeOrderWithRetry("Customer B"),
    ]);

    results.forEach((result, index) => {
      console.log(
        `Customer ${index + 1}:`,
        result.status === "fulfilled"
          ? "Success"
          : result.reason.message
      );
    });
  } finally {
    await pool.end();
  }
}

runRetryTest();