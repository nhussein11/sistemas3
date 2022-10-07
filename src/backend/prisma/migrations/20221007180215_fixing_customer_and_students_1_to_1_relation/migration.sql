/*
  Warnings:

  - You are about to drop the column `studentId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_studentId_fkey";

-- DropIndex
DROP INDEX "Customer_studentId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student_customerId_key" ON "student"("customerId");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
