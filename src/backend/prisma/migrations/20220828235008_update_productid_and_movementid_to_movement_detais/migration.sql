/*
  Warnings:

  - You are about to drop the column `movementDetailsId` on the `movement` table. All the data in the column will be lost.
  - You are about to drop the `_MovementDetailsToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `movement_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movementId]` on the table `movement_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movementId` to the `movement_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `movement_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MovementDetailsToProduct" DROP CONSTRAINT "_MovementDetailsToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovementDetailsToProduct" DROP CONSTRAINT "_MovementDetailsToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_movementDetailsId_fkey";

-- DropIndex
DROP INDEX "movement_movementDetailsId_key";

-- AlterTable
ALTER TABLE "movement" DROP COLUMN "movementDetailsId";

-- AlterTable
ALTER TABLE "movement_details" ADD COLUMN     "movementId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MovementDetailsToProduct";

-- CreateIndex
CREATE UNIQUE INDEX "movement_details_productId_key" ON "movement_details"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "movement_details_movementId_key" ON "movement_details"("movementId");

-- AddForeignKey
ALTER TABLE "movement_details" ADD CONSTRAINT "movement_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement_details" ADD CONSTRAINT "movement_details_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
