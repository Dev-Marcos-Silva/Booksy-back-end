/*
  Warnings:

  - You are about to drop the column `description` on the `libraries` table. All the data in the column will be lost.
  - Added the required column `cep` to the `addresses_libraries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `addresses_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ddd` to the `phones_libraries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ddd` to the `phones_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses_libraries" ADD COLUMN     "cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "addresses_users" ADD COLUMN     "cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "libraries" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "phones_libraries" ADD COLUMN     "ddd" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "phones_users" ADD COLUMN     "ddd" TEXT NOT NULL;
