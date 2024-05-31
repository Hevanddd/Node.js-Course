import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const currentUser = req.user;

  if (currentUser?.role !== "admin") {
    logger.error("Only admins can do it");
    return res.status(403).send({
      data: null,
      error: {
        message: "Only admins can do it",
      },
    });
  }
  next();
}
