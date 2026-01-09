import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "billing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booking_by_id" integer NOT NULL,
  	"deliver_by_id" integer NOT NULL,
  	"area_id" integer NOT NULL,
  	"company_id" integer NOT NULL,
  	"deliver_at" timestamp(3) with time zone NOT NULL,
  	"extra_discount" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "billing_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "billing_id" integer;
  ALTER TABLE "billing" ADD CONSTRAINT "billing_booking_by_id_users_id_fk" FOREIGN KEY ("booking_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "billing" ADD CONSTRAINT "billing_deliver_by_id_users_id_fk" FOREIGN KEY ("deliver_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "billing" ADD CONSTRAINT "billing_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "billing" ADD CONSTRAINT "billing_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "billing_rels" ADD CONSTRAINT "billing_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."billing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "billing_rels" ADD CONSTRAINT "billing_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "billing_booking_by_idx" ON "billing" USING btree ("booking_by_id");
  CREATE INDEX "billing_deliver_by_idx" ON "billing" USING btree ("deliver_by_id");
  CREATE INDEX "billing_area_idx" ON "billing" USING btree ("area_id");
  CREATE INDEX "billing_company_idx" ON "billing" USING btree ("company_id");
  CREATE INDEX "billing_updated_at_idx" ON "billing" USING btree ("updated_at");
  CREATE INDEX "billing_created_at_idx" ON "billing" USING btree ("created_at");
  CREATE INDEX "billing_rels_order_idx" ON "billing_rels" USING btree ("order");
  CREATE INDEX "billing_rels_parent_idx" ON "billing_rels" USING btree ("parent_id");
  CREATE INDEX "billing_rels_path_idx" ON "billing_rels" USING btree ("path");
  CREATE UNIQUE INDEX "billing_rels_tenants_id_idx" ON "billing_rels" USING btree ("tenants_id","path");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_billing_fk" FOREIGN KEY ("billing_id") REFERENCES "public"."billing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_billing_id_idx" ON "payload_locked_documents_rels" USING btree ("billing_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "billing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "billing_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "billing" CASCADE;
  DROP TABLE "billing_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_billing_fk";
  
  DROP INDEX "payload_locked_documents_rels_billing_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "billing_id";`)
}
