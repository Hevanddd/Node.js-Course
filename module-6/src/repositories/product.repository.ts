import { getDatabase } from "../utils/getDatabase";
import { ProductEntity } from "../entities/product.entity";

const getProducts = async (): Promise<ProductEntity[]> => {
  const db = await getDatabase();

  return db.products;
};

const getProductById = async (productId: string): Promise<ProductEntity> => {
  const db = await getDatabase();

  return db.products.find((product: ProductEntity) => {
    return product.id === productId;
  });
};

export default { getProducts, getProductById };
