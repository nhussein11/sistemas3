-- CreateEnum
CREATE TYPE "MovementTypeEnum" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "MovementNameEnum" AS ENUM ('REMITO', 'FACTURA', 'ORDEN_DE_COMPRA', 'ORDEN_DE_PAGO');

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL DEFAULT '',
    "storeId" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL,
    "min_quantity" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT NOT NULL DEFAULT '',
    "movementDetailsId" TEXT NOT NULL,
    "movementTypeId" TEXT NOT NULL,

    CONSTRAINT "movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement_type" (
    "id" TEXT NOT NULL,
    "movementtype" "MovementTypeEnum" NOT NULL,
    "movementname" "MovementNameEnum" NOT NULL,
    "cause" TEXT NOT NULL,

    CONSTRAINT "movement_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement_details" (
    "id" TEXT NOT NULL,

    CONSTRAINT "movement_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovementDetailsToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_productId_key" ON "stock"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_storeId_key" ON "stock"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "movement_movementDetailsId_key" ON "movement"("movementDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "movement_movementTypeId_key" ON "movement"("movementTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "_MovementDetailsToProduct_AB_unique" ON "_MovementDetailsToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MovementDetailsToProduct_B_index" ON "_MovementDetailsToProduct"("B");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_movementDetailsId_fkey" FOREIGN KEY ("movementDetailsId") REFERENCES "movement_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_movementTypeId_fkey" FOREIGN KEY ("movementTypeId") REFERENCES "movement_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovementDetailsToProduct" ADD CONSTRAINT "_MovementDetailsToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "movement_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovementDetailsToProduct" ADD CONSTRAINT "_MovementDetailsToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
