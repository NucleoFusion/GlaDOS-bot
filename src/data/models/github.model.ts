import {
  pgTable,
  bigint,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user.model.js";

/**
 * Defines the `github` table schema.
 */
export const github = pgTable("github", {
  discord_id: bigint({ mode: "bigint" }).primaryKey().references(() => users.discord_id),
  username: varchar("username", { length: 255 }).notNull(),
  githubname: varchar("githubname", { length: 255 }).notNull()
});

/**
 * Type for selecting github records.
 */
export type GithubUser = typeof github.$inferSelect;

/**
 * Type for inserting new github records.
 */
export type GithubNewUser = typeof github.$inferInsert;
