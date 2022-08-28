/*
  Warnings:

  - Changed the type of `category` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('IMPRESORA', 'FILAMENTO');

-- AlterTable
ALTER TABLE "product" DROP COLUMN "category",
ADD COLUMN     "category" "CategoryEnum" NOT NULL;
