/*
  Warnings:

  - Added the required column `quantity` to the `movement_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movement_details" ADD COLUMN     "quantity" INTEGER NOT NULL;
