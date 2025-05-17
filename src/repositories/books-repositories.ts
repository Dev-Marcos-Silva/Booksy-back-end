import { Book, Prisma } from "@prisma/client";

export interface BooksRepository {

    createBook(data: Prisma.BookCreateInput ): Promise<Book>
}