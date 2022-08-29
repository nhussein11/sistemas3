/*
  Warnings:

  - You are about to drop the column `min_quantity` on the `stock` table. All the data in the column will be lost.
  - Added the required column `minQuantity` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock" DROP COLUMN "min_quantity",
ADD COLUMN     "minQuantity" INTEGER NOT NULL;
