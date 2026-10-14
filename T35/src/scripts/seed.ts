
import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "../models/Product.js";

const categories = [
  "Electronics",
  "Furniture",
  "Kitchen",
  "Clothing",
  "Books"
];

async function seedProducts(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Product.init();
  await Product.deleteMany({});

  const products = Array.from({ length: 1000 }, (_, index) => ({
    name: `Product ${index + 1}`,
    sku: `SKU-${String(index + 1).padStart(4, "0")}`,
    category: categories[index % categories.length],
    price: ((index * 137) % 5000) + 100,
    stock: (index * 7) % 100
  }));

  await Product.insertMany(products);

  console.log(`Inserted ${products.length} products`);

  const indexes = await Product.collection.indexes();
  console.log(
    "Indexes:",
    indexes.map((index) => index.name)
  );

  await mongoose.disconnect();
}

seedProducts().catch(async (error: unknown) => {
  console.error("Seeding failed:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
