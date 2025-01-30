-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "posterImageUrl" TEXT NOT NULL,
    "posterImagePublicId" TEXT NOT NULL,
    "hoverImageUrl" TEXT NOT NULL,
    "hoverImagePublicId" TEXT NOT NULL,
    "productImages" JSONB[],
    "additionalInformation" JSONB[],
    "colors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "spacification" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sale" TEXT DEFAULT '0',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saleDuration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posterImageUrl" TEXT,
    "posterImagePublicId" TEXT,
    "description" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posterImageUrl" TEXT,
    "posterImagePublicId" TEXT,

    CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "productId" INTEGER,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
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
    "canVeiwAdmins" BOOLEAN NOT NULL DEFAULT false,
    "canVeiwTotalproducts" BOOLEAN NOT NULL DEFAULT false,
    "canVeiwTotalCategories" BOOLEAN NOT NULL DEFAULT false,
    "posterImageUrl" TEXT,
    "posterImagePublicId" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_record_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductSubCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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

-- CreateTable
CREATE TABLE "_ProductCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategories_name_key" ON "SubCategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_id_key" ON "Reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sales_record_user_email_key" ON "sales_record"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductSubCategories_AB_unique" ON "_ProductSubCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductSubCategories_B_index" ON "_ProductSubCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsTosales_record_products_AB_unique" ON "_ProductsTosales_record_products"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsTosales_record_products_B_index" ON "_ProductsTosales_record_products"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategorySubCategories_AB_unique" ON "_CategorySubCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_CategorySubCategories_B_index" ON "_CategorySubCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategories_AB_unique" ON "_ProductCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategories_B_index" ON "_ProductCategories"("B");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_record_products" ADD CONSTRAINT "sales_record_products_salesRecordId_fkey" FOREIGN KEY ("salesRecordId") REFERENCES "sales_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSubCategories" ADD CONSTRAINT "_ProductSubCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSubCategories" ADD CONSTRAINT "_ProductSubCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsTosales_record_products" ADD CONSTRAINT "_ProductsTosales_record_products_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsTosales_record_products" ADD CONSTRAINT "_ProductsTosales_record_products_B_fkey" FOREIGN KEY ("B") REFERENCES "sales_record_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySubCategories" ADD CONSTRAINT "_CategorySubCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySubCategories" ADD CONSTRAINT "_CategorySubCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
