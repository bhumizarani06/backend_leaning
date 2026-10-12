
import express from "express";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "T31 MongoDB API is running",
  });
});

app.use("/products", productRoutes);

export default app;
