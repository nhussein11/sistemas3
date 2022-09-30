-- CreateTable
CREATE TABLE "PreviousRecord" (
    "id" TEXT NOT NULL,
    "higherRecordId" TEXT NOT NULL,
    "paidForRecordId" TEXT NOT NULL,

    CONSTRAINT "PreviousRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreviousRecord_higherRecordId_key" ON "PreviousRecord"("higherRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousRecord_paidForRecordId_key" ON "PreviousRecord"("paidForRecordId");

-- AddForeignKey
ALTER TABLE "PreviousRecord" ADD CONSTRAINT "PreviousRecord_higherRecordId_fkey" FOREIGN KEY ("higherRecordId") REFERENCES "record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousRecord" ADD CONSTRAINT "PreviousRecord_paidForRecordId_fkey" FOREIGN KEY ("paidForRecordId") REFERENCES "record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
