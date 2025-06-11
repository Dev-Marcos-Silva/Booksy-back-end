import { Availability, Book, Prisma } from "@prisma/client";

type BookWithStar = {
    id: number
    title: string
    author: string
    image: string | null
    description: string
    category: string
    edition: string
    finishing: string
    year_publi: string
    availability: Availability
    isbn: string
    dimensions: string
    page: number
    amount: number
    library_id: string
    created_at: Date
    updated_at: Date
    star: number | null
}

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