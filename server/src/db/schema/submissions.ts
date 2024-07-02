import { InferSelectModel } from "drizzle-orm";
import { integer, json, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { problem } from "./problems";

export const submissionStatusEnum = pgEnum("submission_status", [
  "Pending",
  "Accepted",
  "Failed",
  "TimeLimitExceeded",
  "MemoryLimitExceeded",
  "RuntimeError",
  "CompilationError",
]);

export type SubmissionStatus = "Pending" | "Accepted" | "Failed" | "TimeLimitExceeded" | "MemoryLimitExceeded" | "RuntimeError" | "CompilationError";

export interface ITestCaseResult {
  testCaseId: number;
  status: string; // Use the SubmissionStatus enum values
  runtime: number;
}


export const submission = pgTable("submission", {
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id),
    problemId: integer("problemId").notNull().references(() => problem.id),
    languageId: integer("languageId").notNull(),
    code: text("code").notNull(),
    status: submissionStatusEnum("status").notNull(),
    runtime: integer("runtime"),
    memoryUsage: integer("memoryUsage"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    testcaseResults: json("testcaseResults").$type<ITestCaseResult[]>(),
  });

export type Submission = InferSelectModel<typeof submission>;