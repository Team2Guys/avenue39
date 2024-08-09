/*
  Warnings:

  - You are about to drop the column `Email` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `email` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "Email",
DROP COLUMN "Name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
