import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export const validateScheme = (
  schema: ObjectSchema<any>,
  customErrorMessage?: string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.error(`Request body validation failed: ${customErrorMessage}`);

      return res.status(400).json({
        data: null,
        error: { message: customErrorMessage || error.details[0].message },
      });
    }
    next();
  };
};
