import express from "express";
import { productsRouter, cartRouter, authRouter } from "./routes";
import { authenticationMiddleware } from "./middlewares/auth.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

import * as dotenv from "dotenv";
dotenv.config();

import config from "./config/orm.config";
import "reflect-metadata";
import http from "http";
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";

import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Cart } from "./entities/Cart";
import { CartItem } from "./entities/CartItem";
import { Order } from "./entities/Order";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

const PORT = 8000;

const app = express();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  cartRepository: EntityRepository<Cart>;
  cartItemRepository: EntityRepository<CartItem>;
  orderRepository: EntityRepository<Order>;
  productRepository: EntityRepository<Product>;
  userRepository: EntityRepository<User>;
};

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
  DI.em = DI.orm.em;
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.cartItemRepository = DI.orm.em.getRepository(CartItem);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.userRepository = DI.orm.em.getRepository(User);

  app.use(express.json());
  app.use(authenticationMiddleware);
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  app.use("/api/auth", authRouter);
  app.use("/api/profile/cart", cartRouter);
  app.use("/api/products", productsRouter);

  app.use(errorHandlerMiddleware);

  DI.server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
