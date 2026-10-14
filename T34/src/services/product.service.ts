import { ProductRepository } from "../repositories/product.repository.ts";

const productRepository = new ProductRepository();

export class ProductService {
  async createProduct(data: {
    name: string;
    sku: string;
    price: number;
    stock: number;
  }) {
    return productRepository.create(data);
  }

  async getProductBySku(sku: string) {
    return productRepository.findBySku(sku);
  }

  async getAllProducts() {
    return productRepository.findAll();
  }

  async updateProductStock(sku: string, stock: number) {
    return productRepository.updateStock(sku, stock);
  }

  async deleteProduct(sku: string) {
    return productRepository.deleteBySku(sku);
  }
}