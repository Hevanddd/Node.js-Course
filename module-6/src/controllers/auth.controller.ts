import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await authService.registerUser(req.body);

    res.send({
      data: newUser,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.loginUser(req.body);

    res.send({
      data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export default { registerUser, loginUser };
