-- CreateEnum
CREATE TYPE "Complete" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "rented_books" ADD COLUMN     "is_complete" "Complete" NOT NULL DEFAULT 'false';
