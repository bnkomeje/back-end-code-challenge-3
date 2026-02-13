import express from "express";
import productRoutes from "./api/v1/routes/productRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";

const app = express();
app.use(express.json());

app.use("/api/v1", productRoutes);

// simple error handler
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : "Unknown error";
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message });
});

export default app;
