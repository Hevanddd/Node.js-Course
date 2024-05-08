import Product, { ProductEntity } from "../models/Product";

const getProducts = async (): Promise<ProductEntity[]> => {
  return await Product.find();
};

const getProductById = async (
  productId: string
): Promise<ProductEntity | null> => {
  return await Product.findOne({ id: productId });
};

export default { getProducts, getProductById };
