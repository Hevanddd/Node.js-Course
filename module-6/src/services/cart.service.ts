import { CartEntity, CartItemEntity } from "../entities/cart.entity";
import cartRepository from "../repositories/cart.repository";
import productRepository from "../repositories/product.repository";

const getTotalPriceOfProducts = (products: CartItemEntity[]) => {
  return products.reduce((accum, { product, count }) => {
    return accum + product.price * count;
  }, 0);
};

const getUserCart = async (userId: string) => {
  const userCart = await cartRepository.getUserCartByUserId(userId);

  let cart: CartEntity;

  if (userCart) {
    cart = userCart;
  } else {
    cart = await cartRepository.createUserCart(userId);
  }

  return {
    cart: { id: cart.id, items: cart.items },
    total: getTotalPriceOfProducts(cart.items),
  };
};

const updateUserCart = async (
  userId: string,
  addedProduct: { productId: string; count: number }
) => {
  const product = {
    product: await productRepository.getProductById(addedProduct.productId),
    count: addedProduct.count,
  };
  const userCart = await cartRepository.updateUserCart(userId, product);

  return {
    cart: { id: userCart.id, items: userCart.items },
    total: getTotalPriceOfProducts(userCart.items),
  };
};

const deleteUserCart = async (userId: string) => {
  await cartRepository.deleteUserCart(userId);
};

const createOrder = async (userId: string) => {
  const userCart = await cartRepository.getUserCartByUserId(userId);

  if (!userCart.items.length) {
    throw {
      status: 400,
      message: "Cart is empty",
    };
  }

  await cartRepository.deleteUserCart(userId);

  return await cartRepository.createOrder(
    userId,
    userCart.id,
    userCart.items,
    getTotalPriceOfProducts(userCart.items)
  );
};

export default { getUserCart, updateUserCart, deleteUserCart, createOrder };
