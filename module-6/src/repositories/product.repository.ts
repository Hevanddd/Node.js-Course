import { ProductEntity, Product } from "../entities/Product";

import { DI } from "../index";

const getProducts = async (): Promise<ProductEntity[]> =>
  await DI.productRepository.findAll();

const getProductById = async (
  productId: string
): Promise<ProductEntity | null> =>
  await DI.productRepository.findOne({ id: productId });

export default {
  getProducts,
  getProductById,
};
