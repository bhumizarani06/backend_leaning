import "dotenv/config";
import mongoose from "mongoose";
import { ProductService } from "./services/product.service.ts";

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const productService = new ProductService();
    console.log("Product service initialized");

    
    try {
      await productService.createProduct({
        name: "Invalid Keyboard",
        sku: "INVALID-KEY-01",
        price: -100,
        stock: 5
      });
    } catch (error) {
      console.log(
        "Price validation test:",
        error instanceof Error ? error.message : error
      );
    }

   
    try {
      await productService.createProduct({
        name: "Fractional Stock Product",
        sku: "INVALID-STOCK-01",
        price: 100,
        stock: 5.5
      });
    } catch (error) {
      console.log(
        "Stock validation test:",
        error instanceof Error ? error.message : error
      );
    }

   
    const duplicateTestProduct = {
      name: "Unique Index Test",
      sku: "UNIQUE-TEST-02",
      price: 100,
      stock: 5
    };

    try {
      await productService.createProduct(duplicateTestProduct);
      console.log("First product created successfully");
    } catch (error) {
      console.log(
        "First insert failed:",
        error instanceof Error ? error.message : error
      );
    }

    try {
      await productService.createProduct(duplicateTestProduct);
      console.log("Second product created successfully");
    } catch (error) {
      console.log(
        "Duplicate rejected:",
        error instanceof Error ? error.message : error
      );
    }
try {
  await productService.updateProductStock("TEST-KEY-01", -3);
  console.log("Stock update succeeded");
} catch (error) {
  console.log(
    "Update validation test:",
    error instanceof Error ? error.message : error
  );
}
   
    const products = await productService.getAllProducts();
    console.log("Products:", products);

    console.log(`Verification completed on port ${PORT}`);
  } catch (error) {
    console.error("Failed to run verification:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

startServer();