import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as schema from "@/db/schema";
import { env } from "@/validators/validateEnv";


declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;


if (env.NODE_ENV === "production") {
  db = drizzle(postgres(env.DATABASE_URL), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(env.DATABASE_URL), { schema });
  }

  db = global.db;
}


export { db };