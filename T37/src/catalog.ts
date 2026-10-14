
import { client, db } from "./config.js";
import type { Product } from "./product.js";

async function createCatalog(): Promise<void> {
  try {
    await client.connect();

    const products = db.collection<Product>("products");

    const product: Product = {
      name: "Keyboard",
      price: 1200,
      stock: 5
    };

    const result = await products.insertOne(product);

    console.log("Product added successfully!");
    console.log("Product ID:", result.insertedId);
    console.log("Product details:", product);
  } catch (error) {
    console.error("Catalog operation failed:", error);
  } finally {
    await client.close();
  }
}

createCatalog();
