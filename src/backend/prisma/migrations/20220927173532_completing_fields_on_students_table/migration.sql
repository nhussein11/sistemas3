/*
  Warnings:

  - You are about to drop the column `address` on the `student` table. All the data in the column will be lost.
  - Added the required column `identificationNumber` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "address",
ADD COLUMN     "identificationNumber" INTEGER NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;
