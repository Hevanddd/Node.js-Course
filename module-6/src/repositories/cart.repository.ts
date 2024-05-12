import { User } from "./../entities/User";
import { CartItemEntity } from "../entities/CartItem";
import { CartEntity } from "../entities/Cart";
import { ORDER_STATUS } from "../entities/Order";

import { DI } from "../index";

const getUserCartByUserId = async (
  userId: string
): Promise<CartEntity | null> => {
  const cart = await DI.cartRepository.findOne(
    { user: { id: userId } },
    { populate: ["items", "items.product"] }
  );
  if (cart) {
    return {
      id: cart.id,
      userId: cart.user.id,
      items: cart.items.toArray().map(({ product, id, count }) => {
        return { id, product, count };
      }),
    };
  }
  return null;
};

const createUserCart = async (userId: string): Promise<CartEntity> => {
  const cart = DI.cartRepository.create({
    isDeleted: false,
    items: [],
    user: { id: userId },
  });

  DI.em.persistAndFlush(cart);

  return {
    id: cart.id,
    items: [],
    userId: cart.user.id,
  };
};

const updateUserCart = async (
  userId: string,
  { count, product }: CartItemEntity
) => {
  const cart = await DI.cartRepository.findOne(
    { user: { id: userId } },
    { populate: ["items", "items.product"] }
  );

  if (cart) {
    const existingCartItem = cart.items.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      existingCartItem.count = count;
    } else {
      const cartItem = await DI.cartItemRepository.create({
        count,
        product,
        cart,
      });
      cart.items.add(cartItem);
    }

    await DI.em.flush();

    return {
      id: cart.id,
      userId: cart.user.id,
      items: cart.items.toArray().map(({ product, id, count }) => {
        return { id, product, count };
      }),
    };
  }
};

const deleteUserCart = async (userId: string) => {
  const cart = await DI.cartRepository.findOne({ user: { id: userId } });
  const cartItems = await DI.cartItemRepository.find({ cart: cart?.id });

  await DI.em.removeAndFlush(cartItems);
};

const createOrder = async (userId: string, total: number) => {
  const userCart = await DI.cartRepository.findOne(
    { user: { id: userId } },
    { populate: ["items", "items.product"] }
  );

  const user = (await DI.userRepository.findOne({ id: userId })) as User;

  const order = DI.orderRepository.create({
    user,
    items: userCart?.items,
    payment: { type: "test" },
    delivery: {
      type: "test",
      address: "test",
    },
    comments: "test",
    status: ORDER_STATUS.CREATED,
    total,
  });

  DI.em.persistAndFlush(order);

  return order;
};

export default {
  getUserCartByUserId,
  createUserCart,
  updateUserCart,
  deleteUserCart,
  createOrder,
};
