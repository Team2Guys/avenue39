/*
  Warnings:

  - Added the required column `orderId` to the `sales_record_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_record_products" ADD COLUMN     "orderId" TEXT NOT NULL;
