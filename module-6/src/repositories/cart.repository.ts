import { randomUUID } from "crypto";
import { CartItemEntity } from "../models/CartItem";
import Cart, { CartEntity } from "../models/Cart";
import { getDatabase } from "../utils/getDatabase";
import Order, { OrderEntity, ORDER_STATUS } from "../models/Order";
import { writeDatabase } from "../utils/writeDatabase";

const getUserCartByUserId = async (
  userId: string
): Promise<CartEntity | null> => {
  return await Cart.findOne({ userId });
};

const createUserCart = async (userId: string): Promise<CartEntity> => {
  return await Cart.create({ userId, isDeleted: false, items: [] });
};

const updateUserCart = async (userId: string, cartItem: CartItemEntity) => {
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = [
      ...cart.items.filter((item) => item.product.id !== cartItem.product.id),
      cartItem,
    ];

    await cart.save();
  }

  return cart;
};

const deleteUserCart = async (userId: string) => {
  await Cart.updateOne({ userId }, { items: [] });
};

const createOrder = async (
  userId: string,
  cartId: string,
  items: CartItemEntity[],
  total: number
) => {
  return await Order.create({
    userId,
    cartId,
    items,
    total,
    payment: { type: "test" },
    delivery: {
      type: "test",
      address: "test",
    },
    comments: "test",
    status: ORDER_STATUS.CREATED,
  });
};

export default {
  getUserCartByUserId,
  createUserCart,
  updateUserCart,
  deleteUserCart,
  createOrder,
};
