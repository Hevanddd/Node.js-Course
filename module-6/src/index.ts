import express from "express";
import { productsRouter, cartRouter, authRouter } from "./routes";
import { authenticationMiddleware } from "./middlewares/auth.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import { connectToDb } from "./config/database";

const PORT = 8000;

const app = express();

connectToDb();
app.use(express.json());
app.use(authenticationMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/profile/cart", cartRouter);
app.use("/api/products", productsRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
