import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations, sql } from "drizzle-orm";

export const problem = pgTable("problem", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  difficulty: varchar("difficulty", { length: 6 }).notNull(),
  desc: text("desc"),
  input: text("input"),
  output: text("output"),
  constraints: text("constraints"),
  timeLimit: real("timeLimit").default(5),
  solvedBy: integer("solved_by").array().default(sql`ARRAY[]::integer[]`),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Problems = InferSelectModel<typeof problem>;

export const testcase = pgTable("testcase", {
  id: serial("id").primaryKey(),
  problemId: integer("problemId")
    .notNull()
    .references(() => problem.id),
  input: text("input").notNull(),
  expectedOutput: text("expected_output").notNull(),
  isSample: boolean("is_sample").default(false),
  explanation: text("explanation"),
});

export const problemRelation = relations(problem, ({ many }) => ({
  testcase: many(testcase),
}));

export const testcaseRelation = relations(testcase, ({ one }) => ({
  problem: one(problem, {
    fields: [testcase.problemId],
    references: [problem.id],
  }),
}));

export type Testcase = InferSelectModel<typeof testcase>;
