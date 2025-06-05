/*
  Warnings:

  - You are about to drop the column `email` on the `libraries` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `libraries` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "libraries_email_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "libraries" DROP COLUMN "email",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "password";
