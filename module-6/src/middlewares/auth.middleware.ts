import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { UserEntity } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user: UserEntity;
    }
  }
}

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      data: null,
      error: {
        message: "Token is required",
      },
    });
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(403).send({
      data: null,
      error: {
        message: "Invalid Token",
      },
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as UserEntity;

    req.user = user;
  } catch (err) {
    return res.status(401).send({
      data: null,
      error: {
        message: "Invalid Token",
      },
    });
  }
  return next();
};
