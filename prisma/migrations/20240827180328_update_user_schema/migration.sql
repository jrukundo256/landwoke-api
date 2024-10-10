/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('superAdmin', 'editor', 'subscriber');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'superAdmin';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
