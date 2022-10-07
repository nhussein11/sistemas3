/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "studentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_studentId_key" ON "Customer"("studentId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
