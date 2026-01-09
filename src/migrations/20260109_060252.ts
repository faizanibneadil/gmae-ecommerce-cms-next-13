import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "billing" ADD COLUMN "shop_id" integer NOT NULL;
  ALTER TABLE "billing" ADD CONSTRAINT "billing_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "billing_shop_idx" ON "billing" USING btree ("shop_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "billing" DROP CONSTRAINT "billing_shop_id_shops_id_fk";
  
  DROP INDEX "billing_shop_idx";
  ALTER TABLE "billing" DROP COLUMN "shop_id";`)
}
