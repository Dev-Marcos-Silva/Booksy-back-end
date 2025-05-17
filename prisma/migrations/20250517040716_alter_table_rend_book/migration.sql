-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "availability" SET DEFAULT 'available';

-- AlterTable
ALTER TABLE "rented_books" ADD COLUMN     "user_visibility" "Visibility" NOT NULL DEFAULT 'false';
