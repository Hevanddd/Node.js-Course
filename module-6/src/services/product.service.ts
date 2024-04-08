import productRepository from "../repositories/product.repository";

const getProducts = async () => {
  return await productRepository.getProducts();
};

const getSingleProduct = async (productId: string) => {
  const product = await productRepository.getProductById(productId);

  if (!product) {
    throw {
      status: 404,
      message: `No product with such id`,
    };
  }
  return product;
};

export default { getProducts, getSingleProduct };
