DO $$ BEGIN
 CREATE TYPE "submission_status" AS ENUM('Pending', 'Accepted', 'Failed', 'TimeLimitExceeded', 'MemoryLimitExceeded', 'RuntimeError', 'CompilationError');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(30) NOT NULL,
	"lastName" varchar(30) NOT NULL,
	"displayName" varchar(30) NOT NULL,
	"role" varchar(5) DEFAULT 'user' NOT NULL,
	"email" text NOT NULL,
	"password" varchar(256) NOT NULL,
	"salt" text NOT NULL,
	"verificationCode" varchar(6) DEFAULT '000000' NOT NULL,
	"verificationCodeExpiry" timestamp DEFAULT now() NOT NULL,
	"verified" boolean DEFAULT false,
	"submissionList" text[] DEFAULT ARRAY[]::text[],
	"totalPoints" real DEFAULT 0,
	"problemsSolved" integer[] DEFAULT ARRAY[]::integer[],
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"difficulty" varchar(6) NOT NULL,
	"desc" text,
	"input" text,
	"output" text,
	"constraints" text,
	"timeLimit" real DEFAULT 5,
	"solved_by" integer[] DEFAULT ARRAY[]::integer[],
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testcase" (
	"id" serial PRIMARY KEY NOT NULL,
	"problemId" integer NOT NULL,
	"input" text NOT NULL,
	"expected_output" text NOT NULL,
	"is_sample" boolean DEFAULT false,
	"explanation" text
);
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
CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "displayNameUniqueIndex" ON "user" ("displayName");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testcase" ADD CONSTRAINT "testcase_problemId_problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
