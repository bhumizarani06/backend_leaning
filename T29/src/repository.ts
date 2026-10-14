
import type { Product } from "./types.js";

type Repository<T> = {
  getAll(): T[];
  getById(id: number): T | undefined;
  create(item: T): T;
};

export const productRepository: Repository<Product> = {
  getAll() {
    return [
      {
        id: 1,
        name: "Laptop",
        price: 50000,
        stock: 5,
        createdAt: "2026-10-10"
      },
      {
        id: 2,
        name: "Mouse",
        price: 500,
        stock: 10,
        createdAt: "2026-10-10"
      }
    ];
  },

  getById(id) {
    return this.getAll().find(product => product.id === id);
  },

  create(item) {
    return item;
  }
};

console.log("All products:", productRepository.getAll());
console.log("Product with ID 1:", productRepository.getById(1));

console.log(
  "Created product:",
  productRepository.create({
    id: 3,
    name: "Keyboard",
    price: 1200,
    stock: 8,
    createdAt: "2026-10-10"
  })
);
