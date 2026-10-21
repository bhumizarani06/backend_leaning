
const pool = require("./db");

async function placeOrder(customerName, productId, quantity) {
  const connection = await pool.getConnection();
  let transactionStarted = false;

  try {
    await connection.beginTransaction();
    transactionStarted = true;

    const [products] = await connection.execute(
      `SELECT id, name, price, stock
       FROM products
       WHERE id = ?
       FOR UPDATE`,
      [productId]
    );

    if (products.length === 0) {
      throw new Error("Product not found");
    }

    const product = products[0];

    if (quantity <= 0 || product.stock < quantity) {
      throw new Error("Insufficient stock or invalid quantity");
    }


    const [stockResult] = await connection.execute(
      `UPDATE products
       SET stock = stock - ?
       WHERE id = ? AND stock >= ?`,
      [quantity, productId, quantity]
    );

    if (stockResult.affectedRows !== 1) {
      throw new Error("Stock update failed");
    }

    const totalAmount = Number(product.price) * quantity;

    const [orderResult] = await connection.execute(
      `INSERT INTO orders (customer_name, total_amount)
       VALUES (?, ?)`,
      [customerName, totalAmount]
    );


    await connection.execute(
      `INSERT INTO order_items
       (order_id, product_id, quantity, unit_price)
       VALUES (?, ?, ?, ?)`,
      [orderResult.insertId, productId, quantity, product.price]
    );


    await connection.commit();
    transactionStarted = false;

    return {
      orderId: orderResult.insertId,
      product: product.name,
      quantity,
      totalAmount,
    };
  } catch (error) {
    if (transactionStarted) {
      try {
        await connection.rollback();
        transactionStarted = false;
      } catch (rollbackError) {
        connection.destroy();
        throw new Error(
          `Transaction failed and rollback failed: ${error.message}`
        );
      }
    }

    throw error;
  } finally {
    if (transactionStarted === false) {
      connection.release();
    }
  }
}


async function placeOrderWithRetry()
{
    const maxAttempts = 3;
    for(let attempt = 1;attempt<= maxAttempts;attempt++){
        try{
return await placeOrder(customerName,productId,quantity);
        }catch(error){
const isDeadlock = error.code === "ER_LOCK_DEADLOCK";
if(!isDeadlock || attempt === maxAttempts){
    throw error;
}
console.log(`Deadlock detected. Retrying attempt ${attempt + 1}/${maxAttempts}`
       );
    }
    }
}
module.exports = { placeOrder,placeOrderWithRetry};
