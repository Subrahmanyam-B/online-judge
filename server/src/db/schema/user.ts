import { InferSelectModel, sql } from "drizzle-orm";
import { boolean, pgTable, real, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial('id').primaryKey(),
  firstName: varchar('firstName', { length: 30 }).notNull(),
  lastName: varchar('lastName', { length: 30 }).notNull(),
  displayName: varchar('displayName', { length: 30 }).notNull(),
  email: text('email').notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  salt: text('salt').notNull(),
  verificationCode: varchar('verificationCode', {length: 6}).default(sql`'000000'`).notNull(),
  verificationCodeExpiry: timestamp('verificationCodeExpiry').defaultNow().notNull(),
  verified: boolean('verified').default(false),
  submissionList: text('submissionList').array().default(sql`ARRAY[]::text[]`),
  totalPoints: real('totalPoints').default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),

}, (table) => ({
  emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(table.email),
  displayNameUniqueIndex: uniqueIndex('displayNameUniqueIndex').on(table.displayName)
}))

export type User = InferSelectModel<typeof user>
