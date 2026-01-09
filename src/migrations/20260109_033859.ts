import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Tables create karein agar pehle se nahi hain
  CREATE TABLE IF NOT EXISTS "areas" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "areas_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "tenants_id" integer
  );
  
  -- Masla yahan tha: Check karein agar constraint hai tabhi drop karein
  ALTER TABLE "companies" DROP CONSTRAINT IF EXISTS "companies_distribution_id_tenants_id_fk";
  
  -- Index drop karne ke liye bhi IF EXISTS use karein
  DROP INDEX IF EXISTS "companies_distribution_idx";

  -- Column add karein agar nahi hai
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='areas_id') THEN
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "areas_id" integer;
    END IF;
  END $$;

  -- Constraints aur Indexes
  ALTER TABLE "areas_rels" DROP CONSTRAINT IF EXISTS "areas_rels_parent_fk";
  ALTER TABLE "areas_rels" ADD CONSTRAINT "areas_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."areas"("id") ON DELETE cascade ON UPDATE no action;
  
  ALTER TABLE "areas_rels" DROP CONSTRAINT IF EXISTS "areas_rels_tenants_fk";
  ALTER TABLE "areas_rels" ADD CONSTRAINT "areas_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX IF NOT EXISTS "areas_updated_at_idx" ON "areas" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "areas_created_at_idx" ON "areas" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "areas_rels_order_idx" ON "areas_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "areas_rels_parent_idx" ON "areas_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "areas_rels_path_idx" ON "areas_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "areas_rels_tenants_id_idx" ON "areas_rels" USING btree ("tenants_id");

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_areas_fk";
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_areas_fk" FOREIGN KEY ("areas_id") REFERENCES "public"."areas"("id") ON DELETE cascade ON UPDATE no action;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("areas_id");

  -- Column drop karne se pehle check karein
  DO $$ 
  BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='companies' AND column_name='distribution_id') THEN
      ALTER TABLE "companies" DROP COLUMN "distribution_id";
    END IF;
  END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "areas_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "areas" CASCADE;
  DROP TABLE IF EXISTS "areas_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_areas_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_areas_id_idx";
  
  -- Column wapis add karein agar down migrate kar rahe hain
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='companies' AND column_name='distribution_id') THEN
      ALTER TABLE "companies" ADD COLUMN "distribution_id" integer;
    END IF;
  END $$;

  ALTER TABLE "companies" DROP CONSTRAINT IF EXISTS "companies_distribution_id_tenants_id_fk";
  ALTER TABLE "companies" ADD CONSTRAINT "companies_distribution_id_tenants_id_fk" FOREIGN KEY ("distribution_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  
  CREATE INDEX IF NOT EXISTS "companies_distribution_idx" ON "companies" USING btree ("distribution_id");
  
  DO $$ 
  BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='areas_id') THEN
      ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "areas_id";
    END IF;
  END $$;
  `)
}