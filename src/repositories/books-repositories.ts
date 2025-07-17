import { Book, Prisma } from "@prisma/client";
import { BookWithStar } from "../@types/book-type";
import { UpdateBook } from "../@types/updateBook-type";

export interface BooksRepository {

    createBook(data: Prisma.BookCreateInput ): Promise<Book>

    searchByTitleOrAuthor(query: string ): Promise<Book[]>

    searchByCategory(category: string ): Promise<Book[]>

    findBookIsbn(isbn: string): Promise<Book | null>

    getBookTopRated(): Promise<BookWithStar[]>

    getBookRecent(): Promise<Book[]>

    getBookById(bookId: string ): Promise<Book | null >

    getAllBook(libraryId: string ): Promise<Book[]>

    updateBook(updateBook: UpdateBook): Promise<void>

    updateImage(bookId: string, image: string | null): Promise<Book>

    deleteBookById(bookId: string): Promise<void>
    
}