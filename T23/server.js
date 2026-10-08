import express from "express";

import ProductRepository from "./repositories/product.repository.js";
import ProductService from "./services/product.service.js";
import ProductController from "./controllers/product.controller.js";
import createProductRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());

const productRepository = new ProductRepository();

const productService = new ProductService(
  productRepository
);

const productController = new ProductController(
  productService
);

app.use(
  "/products",
  createProductRoutes(productController)
);

app.get("/", (req, res) => {
  res.json({
    message: "T23 Controllers API is running"
  });
});

app.listen(3000, () => {
  console.log("T23 server running on port 3000");
});