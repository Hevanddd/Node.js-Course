import { CartEntity } from "../models/Cart";
import { CartItemEntity } from "../models/CartItem";
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
  { productId, count }: { productId: string; count: number }
) => {
  const product = await productRepository.getProductById(productId);

  if (!product) {
    throw {
      status: 404,
      message: "Product doesn't exist",
    };
  }

  const userCart = await cartRepository.updateUserCart(userId, {
    product,
    count,
  });

  if (!userCart) {
    throw {
      status: 404,
      message: "Cart was not found",
    };
  }

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
  if (!userCart || !userCart.items.length) {
    throw {
      status: 400,
      message: "Cart is empty",
    };
  }

  const createdOrder = await cartRepository.createOrder(
    userId,
    userCart.id,
    userCart.items,
    getTotalPriceOfProducts(userCart.items)
  );
  await cartRepository.deleteUserCart(userId);

  return createdOrder;
};

export default { getUserCart, updateUserCart, deleteUserCart, createOrder };
