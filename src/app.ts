import express from "express";
import productRoutes from "./api/v1/routes/productRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";

const app = express();
app.use(express.json());

app.use("/api/v1", productRoutes);


export default app;
