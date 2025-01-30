/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `sales_record` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `sales_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_record" ADD COLUMN     "address" TEXT,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "sales_record_orderId_key" ON "sales_record"("orderId");
