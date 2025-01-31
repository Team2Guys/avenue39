-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "filters" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "sizes" JSONB[] DEFAULT ARRAY[]::JSONB[];
