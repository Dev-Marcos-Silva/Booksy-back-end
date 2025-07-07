/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "assessment" DROP CONSTRAINT "assessment_book_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_book_id_fkey";

-- DropForeignKey
ALTER TABLE "favorite_books" DROP CONSTRAINT "favorite_books_book_id_fkey";

-- DropForeignKey
ALTER TABLE "rented_books" DROP CONSTRAINT "rented_books_book_id_fkey";

-- AlterTable
ALTER TABLE "assessment" ALTER COLUMN "book_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "books" DROP CONSTRAINT "books_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "books_id_seq";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "book_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "favorite_books" ALTER COLUMN "book_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "rented_books" ALTER COLUMN "book_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "rented_books" ADD CONSTRAINT "rented_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
