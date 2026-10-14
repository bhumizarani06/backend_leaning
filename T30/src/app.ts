

import express from "express";
import {
  createProduct,
  getProducts
} from "./handlers/productHandler.js";

const app = express();

app.use(express.json());

app.get("/products", getProducts);
app.post("/products", createProduct);

export default app;
