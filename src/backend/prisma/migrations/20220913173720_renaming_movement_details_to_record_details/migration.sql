/*
  Warnings:

  - You are about to drop the column `movementName` on the `record_type` table. All the data in the column will be lost.
  - You are about to drop the column `movementType` on the `record_type` table. All the data in the column will be lost.
  - You are about to drop the `movement_details` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recordName` to the `record_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordType` to the `record_type` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordTypeEnum" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "RecordNameEnum" AS ENUM ('REMITO', 'FACTURA', 'ORDEN_DE_COMPRA', 'ORDEN_DE_PAGO');

-- DropForeignKey
ALTER TABLE "movement_details" DROP CONSTRAINT "movement_details_recordId_fkey";

-- DropForeignKey
ALTER TABLE "movement_details" DROP CONSTRAINT "movement_details_stockId_fkey";

-- AlterTable
ALTER TABLE "record_type" DROP COLUMN "movementName",
DROP COLUMN "movementType",
ADD COLUMN     "recordName" "RecordNameEnum" NOT NULL,
ADD COLUMN     "recordType" "RecordTypeEnum" NOT NULL;

-- DropTable
DROP TABLE "movement_details";

-- DropEnum
DROP TYPE "MovementNameEnum";

-- DropEnum
DROP TYPE "MovementTypeEnum";

-- CreateTable
CREATE TABLE "record_details" (
    "id" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "productId" TEXT,

    CONSTRAINT "record_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "record_details" ADD CONSTRAINT "record_details_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_details" ADD CONSTRAINT "record_details_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_details" ADD CONSTRAINT "record_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
