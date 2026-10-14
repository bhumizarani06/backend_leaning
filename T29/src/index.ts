
import type { ProductSummary, CreateProductDTO } from "./types.js";
import { productRepository } from "./repository.js";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

const product: ProductSummary = {
  name: "Laptop",
  price: 50000
};

const response: ApiResponse<ProductSummary> = {
  success: true,
  data: product,
  message: "Product fetched successfully"
};

const newProduct: CreateProductDTO = {
  name: "Mouse",
  price: 500,
  stock: 10
};

console.log("API Response:", response);
console.log("New Product:", newProduct);

console.log("All products:", productRepository.getAll());
console.log("Product with ID 1:", productRepository.getById(1));
