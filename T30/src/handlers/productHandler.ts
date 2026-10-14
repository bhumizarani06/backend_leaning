import type { Request, Response } from "express";
import { createProduct, getProducts } from "./handlers/productHandler.js";
const products: ProductRecord[] = [
  {
    id: 1,
    name: "Keyboard",
    price: 1200,
    stock: 8
  },
  {
    id: 2,
    name: "Mouse",
    price: 500,
    stock: 10
  }
];

export function getProducts(
  _req: Request,
  res: Response
): Response {
  return res.status(200).json({
    success: true,
    data: products
  });
}

import type { CreateProductDTO } from "../types/product.js";

export function createProduct(
  req: Request<{}, unknown, CreateProductDTO>,
  res: Response
): Response {
  const { name, price, stock } = req.body;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data"
    });
  }

  const product: ProductRecord = {
    id: products.length + 1,
    name: name.trim(),
    price,
    stock
  };

  products.push(product);

  return res.status(201).json({
    success: true,
    data: product
  });
}
