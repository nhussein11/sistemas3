/*
  Warnings:

  - You are about to drop the column `productId` on the `movement_details` table. All the data in the column will be lost.
  - Added the required column `stockId` to the `movement_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movement_details" DROP CONSTRAINT "movement_details_productId_fkey";

-- AlterTable
ALTER TABLE "movement_details" DROP COLUMN "productId",
ADD COLUMN     "stockId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "movement_details" ADD CONSTRAINT "movement_details_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
