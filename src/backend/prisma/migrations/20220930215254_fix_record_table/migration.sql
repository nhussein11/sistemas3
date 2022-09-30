/*
  Warnings:

  - Added the required column `recordNumber` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LetterEnum" AS ENUM ('A', 'B', 'C');

-- AlterTable
ALTER TABLE "record" ADD COLUMN     "customerId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "letter" "LetterEnum" NOT NULL DEFAULT 'A',
ADD COLUMN     "recordNumber" INTEGER NOT NULL,
ADD COLUMN     "supplierId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
