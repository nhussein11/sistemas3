/*
  Warnings:

  - The values [FACTURA] on the enum `RecordNameEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecordNameEnum_new" AS ENUM ('REMITO', 'FACTURA_ORIGINAL', 'FACTURA_DUPLICADO', 'ORDEN_DE_COMPRA', 'ORDEN_DE_PAGO');
ALTER TABLE "record_type" ALTER COLUMN "recordName" TYPE "RecordNameEnum_new" USING ("recordName"::text::"RecordNameEnum_new");
ALTER TYPE "RecordNameEnum" RENAME TO "RecordNameEnum_old";
ALTER TYPE "RecordNameEnum_new" RENAME TO "RecordNameEnum";
DROP TYPE "RecordNameEnum_old";
COMMIT;
