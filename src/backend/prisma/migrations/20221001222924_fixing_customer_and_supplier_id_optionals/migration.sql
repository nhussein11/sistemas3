-- DropForeignKey
ALTER TABLE "record" DROP CONSTRAINT "record_customerId_fkey";

-- DropForeignKey
ALTER TABLE "record" DROP CONSTRAINT "record_supplierId_fkey";

-- AlterTable
ALTER TABLE "record" ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP DEFAULT,
ALTER COLUMN "supplierId" DROP NOT NULL,
ALTER COLUMN "supplierId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
