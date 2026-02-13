import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as productService from "../services/productService";

const VERSION = "1.0.0";

export const health = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: VERSION,
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const created = await productService.createProduct(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Product created",
    data: created,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = await productService.deleteProduct(id);

  if (!deleted) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Product not found",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Product deleted",
  });
};
