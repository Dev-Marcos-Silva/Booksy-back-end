import { Book, Prisma } from "@prisma/client";
import { BookWithStar } from "../@types/book-type";


export interface BooksRepository {

    createBook(data: Prisma.BookCreateInput ): Promise<Book>

    searchByTitleOrAuthor(query: string ): Promise<Book[]>

    searchByCategory(category: string ): Promise<Book[]>

    getBookTopRated(): Promise<BookWithStar[]>

    getBookRecent(): Promise<Book[]>

    getBookById(bookId: number ): Promise<Book | null >

    getAllBook(libraryId: string ): Promise<Book[]>

    updateBook(
        bookId: number,
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

    deleteBookById(bookId: number, libraryId: string): Promise<Book[]>
    
}