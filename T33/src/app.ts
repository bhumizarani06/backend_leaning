import express from "express";
import mongoose from "mongoose";
import { Product } from "./models/product";

export const app = express();

app.use(express.json());


app.get("/health", (_req, res) => {
  res.json({ message: "T33 API is running" });
});


app.get("/products", async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  const filter: Record<string, unknown> = {};

  if (category !== undefined) {
    if (typeof category !== "string" || !category.trim()) {
      return res.status(400).json({ message: "Invalid category" });
    }

    filter.category = category.trim();
  }

  const price: Record<string, number> = {};

  if (minPrice !== undefined) {
    if (typeof minPrice !== "string" || minPrice === "") {
      return res.status(400).json({ message: "Invalid minPrice" });
    }

    const min = Number(minPrice);

    if (!Number.isFinite(min) || min < 0) {
      return res.status(400).json({ message: "Invalid minPrice" });
    }

    price.$gte = min;
  }

  if (maxPrice !== undefined) {
    if (typeof maxPrice !== "string" || maxPrice === "") {
      return res.status(400).json({ message: "Invalid maxPrice" });
    }

    const max = Number(maxPrice);

    if (!Number.isFinite(max) || max < 0) {
      return res.status(400).json({ message: "Invalid maxPrice" });
    }

    price.$lte = max;
  }

  if (
    price.$gte !== undefined &&
    price.$lte !== undefined &&
    price.$gte > price.$lte
  ) {
    return res.status(400).json({
      message: "minPrice cannot exceed maxPrice"
    });
  }

  if (Object.keys(price).length > 0) {
    filter.price = price;
  }

  try {
    const products = await Product.find(filter)
      .select("name category price stock -_id")
      .sort({ _id: 1 });

    return res.json(products);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});


app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (
    typeof id !== "string" ||
    !mongoose.isObjectIdOrHexString(id)
  ) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const updates: Record<string, string | number> = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Invalid name" });
    }

    updates.name = name.trim();
  }

  if (price !== undefined) {
    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({ message: "Invalid price" });
    }

    updates.price = price;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      message: "Provide a valid name or price to update"
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("name category price stock -_id");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch {
    return res.status(500).json({
      message: "Failed to update product"
    });
  }
});

app.get("/products/missing-category", async (_req, res) => {
  try {
    const products = await Product.find({
      category: { $exists: false }
    });

    return res.json(products);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

app.get("/products/page", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1 ||
    limit > 50
  ) {
    return res.status(400).json({
      message: "Invalid page or limit"
    });
  }

  try {
    const products = await Product.find()
      .select("name category price stock -_id")
      .sort({ _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(products);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});


app.get("/products/cursor", async (req, res) => {
  const limit = Number(req.query.limit ?? 10);
  const after = req.query.after;

  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    return res.status(400).json({ message: "Invalid limit" });
  }

  if (
    after !== undefined &&
    (typeof after !== "string" ||
      !mongoose.isObjectIdOrHexString(after))
  ) {
    return res.status(400).json({ message: "Invalid cursor" });
  }

  const filter: Record<string, unknown> = {};

  if (typeof after === "string") {
    filter._id = { $gt: new mongoose.Types.ObjectId(after) };
  }

  try {
    const products = await Product.find(filter)
      .select("name category price stock")
      .sort({ _id: 1 })
      .limit(limit);

    return res.json(products);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});