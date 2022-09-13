/*
  Warnings:

  - You are about to drop the column `movementId` on the `movement_details` table. All the data in the column will be lost.
  - You are about to drop the `movement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movement_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recordId` to the `movement_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `movement_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_movementTypeId_fkey";

-- DropForeignKey
ALTER TABLE "movement_details" DROP CONSTRAINT "movement_details_movementId_fkey";

-- AlterTable
ALTER TABLE "movement_details" DROP COLUMN "movementId",
ADD COLUMN     "recordId" TEXT NOT NULL,
ADD COLUMN     "subtotal" REAL NOT NULL;

-- DropTable
DROP TABLE "movement";

-- DropTable
DROP TABLE "movement_type";

-- CreateTable
CREATE TABLE "record" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT NOT NULL DEFAULT '',
    "senderName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "recordTypeId" TEXT NOT NULL,

    CONSTRAINT "record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_type" (
    "id" TEXT NOT NULL,
    "movementType" "MovementTypeEnum" NOT NULL,
    "movementName" "MovementNameEnum" NOT NULL,
    "cause" TEXT NOT NULL,

    CONSTRAINT "record_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movement_details" ADD CONSTRAINT "movement_details_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_recordTypeId_fkey" FOREIGN KEY ("recordTypeId") REFERENCES "record_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
