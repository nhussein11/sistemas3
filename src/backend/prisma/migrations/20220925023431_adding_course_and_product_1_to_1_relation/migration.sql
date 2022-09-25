/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_productId_key" ON "course"("productId");

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
