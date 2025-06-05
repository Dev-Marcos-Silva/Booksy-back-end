-- CreateEnum
CREATE TYPE "Accept" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "libraries" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "rented_books" ADD COLUMN     "is_accepted" "Accept" NOT NULL DEFAULT 'false';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT;
