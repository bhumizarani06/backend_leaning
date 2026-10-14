
import type { CreateProductDTO } from "./types.js";

export function validateProduct(data: unknown): CreateProductDTO {
  if (typeof data !== "object" || data === null) {
    throw new Error("Product data must be an object");
  }

  if (!("name" in data) || typeof data.name !== "string") {
    throw new Error("Product name must be a string");
  }

  if (data.name.trim() === "") {
    throw new Error("Product name cannot be empty");
  }

  if (
    !("price" in data) ||
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price <= 0
  ) {
    throw new Error("Price must be a positive number");
  }

  if (
    !("stock" in data) ||
    typeof data.stock !== "number" ||
    !Number.isInteger(data.stock) ||
    data.stock < 0
  ) {
    throw new Error("Stock must be a non-negative integer");
  }

  // Return only allowed fields.
  return {
    name: data.name,
    price: data.price,
    stock: data.stock
  };
}
