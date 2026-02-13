import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as productService from "../services/productService";

const VERSION = "1.0.0";


// GET /api/v1/health
export const health = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: VERSION,
  });
};

// GET /api/v1/products
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();

  res.status(HTTP_STATUS.OK).json({
    message: "Products retrieved",
    count: products.length,
    data: products,
  });
};


// GET /api/v1/products/:id
export const getProductById = async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Product not found",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Product retrieved",
    data: product,
  });
};

// POST /api/v1/products
export const createProduct = async (req: Request, res: Response) => {
  const created = await productService.createProduct(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Product created",
    data: created,
  });
};


// PUT /api/v1/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const updated = await productService.updateProduct(req.params.id, req.body);

  if (!updated) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Product not found",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Product updated",
    data: updated,
  });
};


// DELETE /api/v1/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  const deleted = await productService.deleteProduct(req.params.id);

  if (!deleted) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Product not found",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Product deleted",
  });
};
