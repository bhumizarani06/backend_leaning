import { ObjectId } from "mongodb";
import { getDB } from "../config/database.js";

export interface Product {
  name: string;
  price: number;
  stock: number;
}

export async function createProduct(product: Product) {
  const result = await getDB()
    .collection<Product>("products")
    .insertOne(product);

  return {
    _id: result.insertedId,
    ...product,
  };
}

export async function getAllProducts() {
  return getDB()
    .collection<Product>("products")
    .find()
    .toArray();
}

export async function getProductById(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return getDB()
    .collection<Product>("products")
    .findOne({ _id: new ObjectId(id) });
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const result = await getDB()
    .collection<Product>("products")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

  if (result.matchedCount === 0) {
    return null;
  }

  return getDB()
    .collection<Product>("products")
    .findOne({ _id: new ObjectId(id) });
}

export async function deleteProduct(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const result = await getDB()
    .collection<Product>("products")
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount === 1;
}
