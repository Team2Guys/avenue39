/*
  Warnings:

  - You are about to drop the column `filters` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "filters",
ADD COLUMN     "filter" JSONB[] DEFAULT ARRAY[]::JSONB[];
