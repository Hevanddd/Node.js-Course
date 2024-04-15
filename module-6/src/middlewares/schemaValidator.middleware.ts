import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateScheme = (
  schema: ObjectSchema<any>,
  customErrorMessage?: string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        data: null,
        error: { message: customErrorMessage || error.details[0].message },
      });
    }
    next();
  };
};
