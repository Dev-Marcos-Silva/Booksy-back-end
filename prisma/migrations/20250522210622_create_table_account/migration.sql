/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `libraries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `libraries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeAccount" AS ENUM ('user', 'library');

-- AlterTable
ALTER TABLE "libraries" ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "TypeAccount" NOT NULL DEFAULT 'user',

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "libraries_accountId_key" ON "libraries"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "users_accountId_key" ON "users"("accountId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "libraries" ADD CONSTRAINT "libraries_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
