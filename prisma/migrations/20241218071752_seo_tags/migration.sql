-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "canonical_tag" TEXT,
ADD COLUMN     "images_alt_text" TEXT,
ADD COLUMN     "meta_description" TEXT,
ADD COLUMN     "meta_title" TEXT;

-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "canonical_tag" TEXT,
ADD COLUMN     "images_alt_text" TEXT,
ADD COLUMN     "meta_description" TEXT,
ADD COLUMN     "meta_title" TEXT;
