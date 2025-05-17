-- AlterTable
ALTER TABLE "responses" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "favorite_books" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "book_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "favorite_books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
