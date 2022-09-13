/*
  Warnings:

  - You are about to drop the column `productId` on the `record_details` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "record_details" DROP CONSTRAINT "record_details_productId_fkey";

-- AlterTable
ALTER TABLE "record_details" DROP COLUMN "productId";
