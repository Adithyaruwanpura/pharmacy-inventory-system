/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNo]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[grnNo]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "grnNo" TEXT,
ADD COLUMN     "invoiceNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_invoiceNo_key" ON "Purchase"("invoiceNo");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_grnNo_key" ON "Purchase"("grnNo");
