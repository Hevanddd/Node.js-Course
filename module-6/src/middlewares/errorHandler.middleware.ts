import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export const errorHandlerMiddleware = (
  err: {
    status?: number;
    message?: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Failed Request: ${err.message}`);
  return res.status(err.status || 500).send({
    data: null,
    error: { message: err.message || "Internal Server Error" },
  });
};
