
import type { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../repositories/product.repository.js";

export async function createProductHandler(
  req: Request,
  res: Response
) {
  const { name, price, stock } = req.body;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    price < 0 ||
    typeof stock !== "number" ||
    stock < 0 ||
    !Number.isInteger(stock)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
    });
  }

  const product = await createProduct({
    name: name.trim(),
    price,
    stock,
  });

  return res.status(201).json({
    success: true,
    data: product,
  });
}

export async function getAllProductsHandler(
  _req: Request,
  res: Response
) {
  const products = await getAllProducts();

  return res.status(200).json({
    success: true,
    data: products,
  });
}

export async function getProductByIdHandler(
  req: Request,
  res: Response
) {
  const id = req.params.id;

if (typeof id !== "string") {
  return res.status(400).json({
    success: false,
    message: "Invalid product ID",
  });
}
  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: product,
  });
}


export async function updateProductHandler(
  req: Request,
  res: Response
) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const { name, price, stock } = req.body;

  if (
    (name !== undefined &&
      (typeof name !== "string" || name.trim() === "")) ||
    (price !== undefined &&
      (typeof price !== "number" || price < 0)) ||
    (stock !== undefined &&
      (typeof stock !== "number" ||
        stock < 0 ||
        !Number.isInteger(stock))) ||
    (name === undefined && price === undefined && stock === undefined)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid product update data",
    });
  }

  const updates = {
    ...(name !== undefined ? { name: name.trim() } : {}),
    ...(price !== undefined ? { price } : {}),
    ...(stock !== undefined ? { stock } : {}),
  };

  const product = await updateProduct(id, updates);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: product,
  });
}

export async function deleteProductHandler(
  req: Request,
  res: Response
) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const deleted = await deleteProduct(id);

  if (deleted === null) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}
