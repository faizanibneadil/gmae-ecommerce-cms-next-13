import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Pehle column ko text mein convert karein
    ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE text;

    -- 2. Data ko clean karein (lowercase 'user' ko uppercase 'USER' karein)
    -- Aur 'super-admin' ko 'SUPER_ADMIN' karein agar purana data wahan hai
    UPDATE "users_roles" SET "value" = 'USER' WHERE "value" = 'user';
    UPDATE "users_roles" SET "value" = 'SUPER_ADMIN' WHERE "value" = 'super-admin';
    
    -- Safety ke liye baqi sab ko bhi uppercase kar sakte hain
    UPDATE "users_roles" SET "value" = UPPER("value");

    -- 3. Purana Enum drop karke naya banayein
    DROP TYPE "public"."enum_users_roles";
    CREATE TYPE "public"."enum_users_roles" AS ENUM('CUSTOMER', 'SALES_MAN', 'BOOKER', 'KPO', 'ADMIN', 'SUPER_ADMIN', 'USER');

    -- 4. Ab column ko naye Enum mein convert karein
    ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE text;
    
    -- Down migration mein wapis lowercase values par le jayein agar zaroorat ho
    UPDATE "users_roles" SET "value" = 'user' WHERE "value" = 'USER';
    UPDATE "users_roles" SET "value" = 'super-admin' WHERE "value" = 'SUPER_ADMIN';

    DROP TYPE "public"."enum_users_roles";
    CREATE TYPE "public"."enum_users_roles" AS ENUM('super-admin', 'user');
    
    ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  `)
}