import { Book, Prisma } from "@prisma/client";
import { BookWithStar } from "../@types/book-type";


export interface BooksRepository {

    createBook(data: Prisma.BookCreateInput ): Promise<Book>

    searchByTitleOrAuthor(query: string ): Promise<Book[]>

    searchByCategory(category: string ): Promise<Book[]>

    findBookIsbn(isbn: string): Promise<Book | null>

    getBookTopRated(): Promise<BookWithStar[]>

    getBookRecent(): Promise<Book[]>

    getBookById(bookId: string ): Promise<Book | null >

    getAllBook(libraryId: string ): Promise<Book[]>

    updateBook(
        bookId: string,
        title: string,
        image: string | null, 
        author: string, 
        description: string, 
        category: string, 
        edition: string, 
        finishing: string, 
        year_publi: string, 
        availability: 'available' | 'unavailable',
        isbn: string, 
        dimensions: string,
        page: number,          
        amount: number, 
    ): Promise<Book>

    updateImage(bookId: string, image: string | null): Promise<Book>

    deleteBookById(bookId: string, libraryId: string): Promise<Book[]>
    
}