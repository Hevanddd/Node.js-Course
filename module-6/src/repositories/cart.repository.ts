import { randomUUID } from "crypto";
import { CartEntity, CartItemEntity } from "../entities/cart.entity";
import { getDatabase } from "../utils/getDatabase";
import { writeDatabase } from "../utils/writeDatabase";
import { OrderEntity } from "../entities/order.entity";

const getUserCartByUserId = async (userId: string): Promise<CartEntity> => {
  const db = await getDatabase();

  return db.carts.find((cart: CartEntity) => {
    return cart.userId === userId;
  });
};

const createUserCart = async (userId: string): Promise<CartEntity> => {
  const db = await getDatabase();

  const newCart: CartEntity = {
    id: randomUUID(),
    userId,
    isDeleted: false,
    items: [],
  };

  const updatedDb = { ...db, carts: [...db.carts, newCart] };

  await writeDatabase(updatedDb);
  return newCart;
};

const updateUserCart = async (userId: string, cartItem: CartItemEntity) => {
  const db = await getDatabase();
  const userCart = await getUserCartByUserId(userId);

  if (!userCart) {
    throw {
      status: 404,
      message: `Cart was not found`,
    };
  }

  const newUserCart = {
    ...userCart,
    items: [
      ...userCart.items.filter(
        (item) => item.product.id !== cartItem.product.id
      ),
      cartItem,
    ],
  };

  const updatedDb = {
    ...db,
    carts: [
      ...db.carts.filter((cart: CartEntity) => cart.userId !== userId),
      newUserCart,
    ],
  };

  await writeDatabase(updatedDb);
  return newUserCart;
};

const deleteUserCart = async (userId: string) => {
  const db = await getDatabase();

  const userCart = await getUserCartByUserId(userId);

  const updatedDb = {
    ...db,
    carts: [
      ...db.carts.filter((cart: CartEntity) => cart.userId !== userId),
      { ...userCart, items: [] },
    ],
  };

  await writeDatabase(updatedDb);
};

const createOrder = async (
  userId: string,
  cartId: string,
  items: CartItemEntity[],
  total: number
) => {
  const db = await getDatabase();

  const newOrder: OrderEntity = {
    id: randomUUID(),
    userId,
    cartId,
    items,
    total: total,

    payment: {
      type: "test",
    },
    delivery: {
      type: "test",
      address: "test",
    },
    comments: "test",
    status: "created",
  };
  const updatedDb = {
    ...db,
    orders: [newOrder],
  };

  await writeDatabase(updatedDb);
  return newOrder;
};

export default {
  getUserCartByUserId,
  createUserCart,
  updateUserCart,
  deleteUserCart,
  createOrder,
};
