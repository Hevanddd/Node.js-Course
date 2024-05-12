import {
  Entity,
  PrimaryKey,
  Property,
  OneToOne,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { randomUUID } from "crypto";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity()
export class User {
  @PrimaryKey()
  id: string = randomUUID();

  @OneToOne(() => Cart, (cart) => cart.user)
  cart!: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders = new Collection<Order>(this);
}
