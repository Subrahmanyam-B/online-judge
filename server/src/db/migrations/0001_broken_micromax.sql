ALTER TABLE "user" RENAME COLUMN "name" TO "lastName";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "firstName" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "displayName" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "salt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "verificationCode" varchar(6) DEFAULT '000000' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "verificationCodeExpiry" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "verified" boolean DEFAULT false;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "displayNameUniqueIndex" ON "user" ("displayName");