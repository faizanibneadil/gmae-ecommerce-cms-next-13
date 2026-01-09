import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "companies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"distribution_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "companies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "companies_id" integer;
  ALTER TABLE "companies" ADD CONSTRAINT "companies_distribution_id_tenants_id_fk" FOREIGN KEY ("distribution_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies_rels" ADD CONSTRAINT "companies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_rels" ADD CONSTRAINT "companies_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "companies_distribution_idx" ON "companies" USING btree ("distribution_id");
  CREATE INDEX "companies_updated_at_idx" ON "companies" USING btree ("updated_at");
  CREATE INDEX "companies_created_at_idx" ON "companies" USING btree ("created_at");
  CREATE INDEX "companies_rels_order_idx" ON "companies_rels" USING btree ("order");
  CREATE INDEX "companies_rels_parent_idx" ON "companies_rels" USING btree ("parent_id");
  CREATE INDEX "companies_rels_path_idx" ON "companies_rels" USING btree ("path");
  CREATE INDEX "companies_rels_tenants_id_idx" ON "companies_rels" USING btree ("tenants_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_companies_id_idx" ON "payload_locked_documents_rels" USING btree ("companies_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "companies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "companies_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "companies" CASCADE;
  DROP TABLE "companies_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_companies_fk";
  
  DROP INDEX "payload_locked_documents_rels_companies_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "companies_id";`)
}
