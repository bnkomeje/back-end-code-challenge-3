import express from "express";
import * as productController from "../controllers/productController";
import { validateRequest } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";

const router = express.Router();

router.get("/health", productController.health);

router.post(
  "/products",
  validateRequest(productSchemas.create),
  productController.createProduct
);

router.delete(
  "/products/:id",
  validateRequest(productSchemas.delete),
  productController.deleteProduct
);

export default router;
