import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  ManyToOne,
  Collection,
  Enum,
} from "@mikro-orm/core";
import { randomUUID } from "crypto";
import { User } from "./User";
import { CartItem, CartItemEntity } from "./CartItem";

export enum ORDER_STATUS {
  CREATED = "created",
  COMPLETED = "completed",
}

export interface OrderEntity {
  id: string;
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

@Entity()
export class Order {
  @PrimaryKey()
  id: string = randomUUID();

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => CartItem, (item) => item.order)
  items = new Collection<CartItem>(this);

  @Property()
  payment!: { type: string; address?: any; creditCard?: any };

  @Property()
  delivery!: { type: string; address: string };

  @Property()
  comments!: string;

  @Enum(() => ORDER_STATUS)
  status!: ORDER_STATUS;

  @Property()
  total!: number;
}
