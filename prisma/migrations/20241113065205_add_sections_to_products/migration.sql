-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "sections" JSONB[] DEFAULT ARRAY[]::JSONB[];
