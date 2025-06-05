import { Book, Prisma } from "@prisma/client";

export interface BooksRepository {

    createBook(data: Prisma.BookCreateInput ): Promise<Book>

    searchByTitle(title: string ): Promise<Book[]>

    searchByCategory(category: string ): Promise<Book[]>

    getBookTopRated(): Promise<Book[]>

    getBookRecent(): Promise<Book[]>

    getBookById(bookId: number ): Promise<Book>

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
        availability: string,
        isbn: string, 
        dimensions: string,
        page: number,          
        amount: number, 
    ): Promise<Book>

    deleteBookById(bookId: number): Promise<Book[]>
    
}