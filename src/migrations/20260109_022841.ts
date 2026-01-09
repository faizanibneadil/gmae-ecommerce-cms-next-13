import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  ALTER TABLE "media" DROP CONSTRAINT "media_tenant_id_tenants_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_tenant_id_tenants_id_fk";
  
  DROP INDEX "media_tenant_idx";
  DROP INDEX "pages_tenant_idx";
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_tenants_id_idx" ON "media_rels" USING btree ("tenants_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_tenants_id_idx" ON "pages_rels" USING btree ("tenants_id");
  ALTER TABLE "media" DROP COLUMN "tenant_id";
  ALTER TABLE "pages" DROP COLUMN "tenant_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  ALTER TABLE "media" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "pages" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");`)
}
