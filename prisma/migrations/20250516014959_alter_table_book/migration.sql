/*
  Warnings:

  - Added the required column `availability` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('available', 'unavailable');

-- AlterTable
ALTER TABLE "books" DROP COLUMN "availability",
ADD COLUMN     "availability" "Availability" NOT NULL;
