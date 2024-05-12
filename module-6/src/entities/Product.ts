import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "crypto";

export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

@Entity()
export class Product {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}
