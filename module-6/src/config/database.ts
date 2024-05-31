import mongoose from "mongoose";
import { logger } from "../logger";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

export function connectToDb() {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    logger.error("Please provide DataBase URI to connect. exiting now...");
    process.exit(1);
  }

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      logger.info("Succesfully connected to MongoDB");
    })
    .catch((error: Error) => {
      logger.error(`Error connecting to MongoDB: ${error}`);
    });
}
