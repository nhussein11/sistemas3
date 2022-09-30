/*
  Warnings:

  - You are about to drop the column `senderName` on the `record` table. All the data in the column will be lost.
  - Added the required column `paidFor` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "record" DROP COLUMN "senderName",
ADD COLUMN     "paidFor" BOOLEAN NOT NULL;
