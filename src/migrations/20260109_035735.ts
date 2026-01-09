import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_shops_pop_type" AS ENUM('RETAILER', 'WHOLESELER');
  CREATE TYPE "public"."enum_shops_pay_type" AS ENUM('CASH', 'CHEQUE', 'BILL');
  CREATE TABLE "shops" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"owner_id" integer NOT NULL,
  	"area_id" integer,
  	"pop_type" "enum_shops_pop_type",
  	"pay_type" "enum_shops_pay_type",
  	"phone" numeric,
  	"address" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shops_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "shops_id" integer;
  ALTER TABLE "shops" ADD CONSTRAINT "shops_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shops" ADD CONSTRAINT "shops_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shops_rels" ADD CONSTRAINT "shops_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shops_rels" ADD CONSTRAINT "shops_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "shops_owner_idx" ON "shops" USING btree ("owner_id");
  CREATE INDEX "shops_area_idx" ON "shops" USING btree ("area_id");
  CREATE INDEX "shops_updated_at_idx" ON "shops" USING btree ("updated_at");
  CREATE INDEX "shops_created_at_idx" ON "shops" USING btree ("created_at");
  CREATE INDEX "shops_rels_order_idx" ON "shops_rels" USING btree ("order");
  CREATE INDEX "shops_rels_parent_idx" ON "shops_rels" USING btree ("parent_id");
  CREATE INDEX "shops_rels_path_idx" ON "shops_rels" USING btree ("path");
  CREATE INDEX "shops_rels_tenants_id_idx" ON "shops_rels" USING btree ("tenants_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shops_fk" FOREIGN KEY ("shops_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_shops_id_idx" ON "payload_locked_documents_rels" USING btree ("shops_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "shops" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shops_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "shops" CASCADE;
  DROP TABLE "shops_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shops_fk";
  
  DROP INDEX "payload_locked_documents_rels_shops_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "shops_id";
  DROP TYPE "public"."enum_shops_pop_type";
  DROP TYPE "public"."enum_shops_pay_type";`)
}
