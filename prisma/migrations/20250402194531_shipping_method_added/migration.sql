/*
  Warnings:

  - Added the required column `shippingDate` to the `sales_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingTime` to the `sales_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_record" ADD COLUMN     "shipmentMethod" JSONB,
ADD COLUMN     "shippingDate" TEXT NOT NULL,
ADD COLUMN     "shippingTime" TEXT NOT NULL;
