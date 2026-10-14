
import { client, db } from "./config.js";

async function createOrder(): Promise<void> {
  let productId: unknown;
  let stockReserved = false;

  try {
    await client.connect();

    const products = db.collection("products");
    const orders = db.collection("orders");

    const product = await products.findOneAndUpdate(
      {
        name: "Keyboard",
        stock: { $gte: 1 }
      },
      {
        $inc: { stock: -1 }
      },
      {
        returnDocument: "after"
      }
    );

    if (!product) {
      console.log("Product unavailable or out of stock.");
      return;
    }

    productId = product._id;
    stockReserved = true;

    const order = {
      productId: product._id,
      quantity: 1,
      totalPrice: product.price,
      status: "created"
    };

    const result = await orders.insertOne(order);


    stockReserved = false;

    console.log("Order created!");
    console.log("Order ID:", result.insertedId);
    console.log("Order details:", order);
    console.log("Remaining stock:", product.stock);
  } catch (error) {
    console.error("Order creation failed:", error);

    if (stockReserved && productId) {
      try {
        const products = db.collection("products");

        await products.updateOne(
          {
            _id: productId,
            stock: { $gte: 0 }
          },
          {
            $inc: { stock: 1 }
          }
        );

        console.log("Stock compensation attempted.");
      } catch (rollbackError) {
        console.error(
          "Stock recovery failed; manual verification is required:",
          rollbackError
        );
      }
    }
  } finally {
    await client.close();
  }
}

createOrder();
