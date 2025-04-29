-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "home_product" JSONB,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SubCategories" ALTER COLUMN "updatedAt" DROP DEFAULT;
