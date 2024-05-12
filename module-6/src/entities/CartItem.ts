import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToOne,
} from "@mikro-orm/core";
import { randomUUID } from "crypto";
import { Product, ProductEntity } from "./Product";
import { Cart } from "./Cart";
import { Order } from "./Order";

export interface CartItemEntity {
  product: Product;
  count: number;
}

@Entity()
export class CartItem {
  @PrimaryKey()
  id: string = randomUUID();

  @OneToOne()
  product!: Product;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @ManyToOne(() => Order)
  order?: Order | null = null;

  @Property()
  count!: number;
}
