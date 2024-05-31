import express from "express";
import { productsRouter, cartRouter, authRouter } from "./routes";
import { authenticationMiddleware } from "./middlewares/auth.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import { connectToDb } from "./config/database";
import dotenv from "dotenv";
import { Socket } from "net";
import mongoose from "mongoose";
import { logger, requestLogger } from "./logger";

dotenv.config();
const { API_PORT } = process.env;
const port = API_PORT || 8000;

const app = express();

connectToDb();
app.use(express.json());
app.use(requestLogger);

app.use("/api/auth", authRouter);
app.use(authenticationMiddleware);
app.use("/api/profile/cart", cartRouter);
app.use("/api/products", productsRouter);
app.get("/healthcheck", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      res.status(200).send("OK");
    } else {
      throw new Error("Database not connected");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
app.use(errorHandlerMiddleware);

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

let connections: Socket[] = [];

server.on("connection", (connection) => {
  connections.push(connection);
  connection.on("close", () => {
    connections = connections.filter((curr) => curr !== connection);
  });
});

function shutdown() {
  logger.info("Received kill signal, shutting down gracefully");

  server.close(() => {
    logger.info("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);

  // end current connections
  connections.forEach((connection) => connection.end());

  // then destroy connections
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
