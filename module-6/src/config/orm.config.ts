import * as dotenv from "dotenv";
dotenv.config();
import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const options: Options<PostgreSqlDriver> = {
  dbName: "node_gmp",
  clientUrl: "postgresql://node_gmp:password123@localhost:5432/database", // Your PostgreSQL connection URL
  entities: ["./dist/entities"], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: "./dist/migrations", // path to the folder with migrations
    pathTs: "./src/migrations", // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  extensions: [Migrator, SeedManager],
  seeder: {
    defaultSeeder: "DatabaseSeeder",
  },
};

export default options;
