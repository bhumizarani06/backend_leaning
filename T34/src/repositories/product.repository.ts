
import { Product } from "../models/product.model.ts";

export class ProductRepository {
  async create(data: {
    name: string;
    sku: string;
    price: number;
    stock: number;
  }) {
    return Product.create(data);
  }

  async findBySku(sku: string) {
    return Product.findOne({ sku });
  }

  async findAll() {
    return Product.find();
  }

async updateStock(sku: string, stock: number) {
  return Product.findOneAndUpdate(
    { sku },
    { $set: { stock } },
    {
      returnDocument: "after",
      runValidators: true
    }
  );
}


  async deleteBySku(sku: string) {
    return Product.findOneAndDelete({ sku });
  }
}
