
import { client, db } from "./config.js";

async function reduceStock(): Promise<void> {
  try {
    await client.connect();

    const products = db.collection("products");

    const result = await products.updateOne(
      {
        name: "Keyboard",
        stock: { $gte: 1 }
      },
      {
        $inc: { stock: -1 }
      }
    );

    if (result.matchedCount === 1) {
      console.log("Stock reduced successfully!");
    } else {
      console.log("Product not found or stock unavailable.");
    }

    const product = await products.findOne({
      name: "Keyboard"
    });

    console.log("Current product:", product);
  } catch (error) {
    console.error("Stock update failed:", error);
  } finally {
    await client.close();
  }
}

reduceStock();
