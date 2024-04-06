import { pgTable, text } from "drizzle-orm/pg-core";

export const Testing = pgTable("testing", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
});
