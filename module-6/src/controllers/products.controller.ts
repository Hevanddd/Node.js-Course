import { Request, Response, NextFunction } from "express";
import productService from "../services/product.service";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getProducts();

    res.send({
      data: products,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const product = await productService.getSingleProduct(productId);

    res.send({
      data: product,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export default { getProducts, getSingleProduct };
