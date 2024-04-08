import { NextFunction, Request, Response } from "express";
import cartService from "../services/cart.service";

const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCart = await cartService.getUserCart(
      req.headers["x-user-id"] as string
    );

    res.send({
      data: userCart,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCart = await cartService.updateUserCart(
      req.headers["x-user-id"] as string,
      req.body
    );

    res.send({
      data: userCart,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await cartService.deleteUserCart(req.headers["x-user-id"] as string);

    res.send({
      data: {
        success: true,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await cartService.createOrder(
      req.headers["x-user-id"] as string
    );

    res.send({
      data: order,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export default { getUserCart, updateUserCart, deleteUserCart, createOrder };
