import express from "express";
import * as productController from "../controllers/productController";
import { validateRequest } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";

const router = express.Router();

// GET /api/v1/health
router.get("/health", productController.health);

// GET /api/v1/products
router.get("/products", productController.getAllProducts);

// GET /api/v1/products/:id 
router.get("/products/:id", productController.getProductById);

// POST /api/v1/products  uses Joi create schema
router.post(
  "/products",
  validateRequest(productSchemas.create),
  productController.createProduct
);

// PUT /api/v1/products/:id 
router.put("/products/:id", productController.updateProduct);

// DELETE /api/v1/products/:id uses Joi delete schema
router.delete(
  "/products/:id",
  validateRequest(productSchemas.delete),
  productController.deleteProduct
);

export default router;
