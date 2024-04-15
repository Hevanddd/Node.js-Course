import { Request, Response, NextFunction } from "express";

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["x-user-id"]) {
    res.status(403).send({
      data: null,
      error: {
        message: "You must be authorized user",
      },
    });
  }
  if (req.headers["x-user-id"] !== "admin") {
    res.status(401).send({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
  } else {
    next();
  }
};
