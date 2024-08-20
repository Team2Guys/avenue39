/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `SubCategories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubCategories" DROP CONSTRAINT "SubCategories_categoriesId_fkey";

-- AlterTable
ALTER TABLE "SubCategories" DROP COLUMN "categoriesId";

-- CreateTable
CREATE TABLE "sales_record" (
    "id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_record_products" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productData" JSONB NOT NULL,
    "salesRecordId" INTEGER NOT NULL,

    CONSTRAINT "sales_record_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductsTosales_record_products" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategorySubCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_record_user_email_key" ON "sales_record"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsTosales_record_products_AB_unique" ON "_ProductsTosales_record_products"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsTosales_record_products_B_index" ON "_ProductsTosales_record_products"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategorySubCategories_AB_unique" ON "_CategorySubCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_CategorySubCategories_B_index" ON "_CategorySubCategories"("B");

-- AddForeignKey
ALTER TABLE "sales_record_products" ADD CONSTRAINT "sales_record_products_salesRecordId_fkey" FOREIGN KEY ("salesRecordId") REFERENCES "sales_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsTosales_record_products" ADD CONSTRAINT "_ProductsTosales_record_products_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsTosales_record_products" ADD CONSTRAINT "_ProductsTosales_record_products_B_fkey" FOREIGN KEY ("B") REFERENCES "sales_record_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySubCategories" ADD CONSTRAINT "_CategorySubCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySubCategories" ADD CONSTRAINT "_CategorySubCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
