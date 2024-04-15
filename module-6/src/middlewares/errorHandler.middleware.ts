import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: {
    status?: number;
    message?: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.status || 500).send({
    data: null,
    error: { message: err.message || "Internal Server Error" },
  });
};
