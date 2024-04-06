import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

import { env } from "@/validators/validateEnv";

const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

export { db };
