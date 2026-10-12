
import { Router } from "express";
import {
  createProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getAllProductsHandler);
router.post("/", createProductHandler);
router.get("/:id", getProductByIdHandler);
router.patch("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
