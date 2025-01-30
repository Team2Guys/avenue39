-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "last_editedBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "last_editedBy" TEXT;
