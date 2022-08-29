/*
  Warnings:

  - You are about to drop the column `movementname` on the `movement_type` table. All the data in the column will be lost.
  - You are about to drop the column `movementtype` on the `movement_type` table. All the data in the column will be lost.
  - Added the required column `movementName` to the `movement_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movementType` to the `movement_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movement_type" DROP COLUMN "movementname",
DROP COLUMN "movementtype",
ADD COLUMN     "movementName" "MovementNameEnum" NOT NULL,
ADD COLUMN     "movementType" "MovementTypeEnum" NOT NULL;
