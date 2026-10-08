import express from "express";

export default function createProductRoutes(productController) {
  const router = express.Router();

  router.get("/", productController.getProducts);
  router.get("/:id", productController.getProduct);

  router.post("/", productController.createProduct);

  router.put("/:id", productController.updateProduct);

  router.delete("/:id", productController.deleteProduct);

  router.post("/:id/purchase", productController.purchaseProduct);

  return router;
}