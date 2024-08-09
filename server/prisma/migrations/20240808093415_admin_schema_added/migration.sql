-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "canAddProduct" BOOLEAN NOT NULL DEFAULT false,
    "canEditProduct" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteProduct" BOOLEAN NOT NULL DEFAULT false,
    "canAddCategory" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteCategory" BOOLEAN NOT NULL DEFAULT false,
    "canEditCategory" BOOLEAN NOT NULL DEFAULT false,
    "canCheckProfit" BOOLEAN NOT NULL DEFAULT false,
    "canCheckRevenue" BOOLEAN NOT NULL DEFAULT false,
    "canCheckVisitors" BOOLEAN NOT NULL DEFAULT false,
    "canViewUsers" BOOLEAN NOT NULL DEFAULT false,
    "canViewSales" BOOLEAN NOT NULL DEFAULT false,
    "canViewAdmins" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalProducts" BOOLEAN NOT NULL DEFAULT false,
    "canViewTotalCategories" BOOLEAN NOT NULL DEFAULT false,
    "posterImageUrl" TEXT NOT NULL,
    "posterImagePublicId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
