import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "billing_rels_tenants_id_idx";
  CREATE INDEX "billing_rels_tenants_id_idx" ON "billing_rels" USING btree ("tenants_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "billing_rels_tenants_id_idx";
  CREATE UNIQUE INDEX "billing_rels_tenants_id_idx" ON "billing_rels" USING btree ("tenants_id","path");`)
}
