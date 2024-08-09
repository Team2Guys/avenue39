/*
  Warnings:

  - You are about to drop the column `productsId` on the `Reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_productsId_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "productsId",
ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
