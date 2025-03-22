-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "shippingOptions" JSONB[] DEFAULT ARRAY[]::JSONB[];
