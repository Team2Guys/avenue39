/*
  Warnings:

  - Added the required column `firstName` to the `sales_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `sales_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_record" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "orderNote" TEXT;
