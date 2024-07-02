DO $$ BEGIN
 CREATE TYPE "submission_status" AS ENUM('Pending', 'Accepted', 'Failed', 'TimeLimitExceeded', 'MemoryLimitExceeded', 'RuntimeError', 'CompilationError');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"problemId" integer NOT NULL,
	"languageId" integer NOT NULL,
	"code" text NOT NULL,
	"status" "submission_status" NOT NULL,
	"runtime" integer,
	"memoryUsage" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"testcaseResults" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_problemId_problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
