/*
  Warnings:

  - You are about to drop the column `userId` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Quote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_userId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "userId";
