import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Product } from "../entities/Product";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Product, {
      title: "Another Book",
      description: "Even more interesting book",
      price: 200,
    });
    em.create(Product, {
      title: "Book",
      description: "A very interesting book",
      price: 100,
    });
  }
}
