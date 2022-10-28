/*
  Warnings:

  - Added the required column `historicalPrice` to the `record_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "record_details" ADD COLUMN     "historicalPrice" REAL NOT NULL;
