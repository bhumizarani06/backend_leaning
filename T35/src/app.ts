
import express from "express";
import { Product } from "./models/Product.js";

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "T35 Product API is running" });
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json(product);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        error: "A product with this SKU already exists"
      });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ValidationError"
    ) {
      return res.status(400).json({
        error: "Product validation failed"
      });
    }

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});
