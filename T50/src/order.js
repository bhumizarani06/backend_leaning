const pool = require("../config/db");

async function placeOrder(customerName) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `UPDATE products
       SET stock = stock - 1
       WHERE id = 1 AND stock > 0
       RETURNING id, name, stock, price`
    );

    if (result.rowCount === 0) {
      throw new Error("Out of stock");
    }

    await client.query("COMMIT");

    return {
      customer: customerName,
      product: result.rows[0].name,
      remainingStock: result.rows[0].stock,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { placeOrder };