import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  ManyToOne,
  OneToOne,
} from "@mikro-orm/core";
import { randomUUID } from "crypto";
import { User } from "./User";
import { CartItem, CartItemEntity } from "./CartItem";

export interface CartEntity {
  id: string;
  userId: string;
  items: CartItemEntity[];
}

@Entity()
export class Cart {
  @PrimaryKey()
  id: string = randomUUID();

  @OneToMany(() => CartItem, (item) => item.cart)
  items = new Collection<CartItem>(this);

  @OneToOne(() => User)
  user!: User;

  @Property()
  isDeleted: boolean = false;
}
