import { BooksRepository } from "../repositories/books-repositories";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { clean } from "../utils/clean-string";
import { verify } from "../utils/verify-number";
import { BookNotFoundError } from "./err/book-not-found-err";
import { DuplicateBookRecordError } from "./err/duplicate-book-record.err";
import { LibraryNotFoundError } from "./err/library-not-found-err";

interface UpdateRegisterBookUseCaseRequest{
    bookId: string
    libraryId: string
    title: string
    author: string
    description: string
    category: string
    edition: string
    finishing: string
    year_publi: string
    availability: 'available' | 'unavailable'
    isbn: string
    dimensions: string
    page: number           
    amount: number  
}

export class UpdateRegisterBookUseCase{

    constructor(
        private booksRepository: BooksRepository,
        private libraryRepository: LibraryRepository,
    ){}

    async execute({ 
        bookId,
        libraryId,
        title, 
        author, 
        description, 
        category, 
        edition, 
        finishing, 
        year_publi, 
        availability, 
        isbn, 
        dimensions, 
        page, 
        amount,}: UpdateRegisterBookUseCaseRequest): Promise<void> {

        const book = await this.booksRepository.getBookById(bookId)

        if(!book){
            throw new BookNotFoundError()
        }

        const library_Id = await this.libraryRepository.findById(libraryId) 
        
        if(!library_Id){
            throw new LibraryNotFoundError()
        }
        
        const bookExist = await this.booksRepository.findBookIsbn(isbn)
        
        if(bookExist){
            bookExist.map(bookExist => {
                if(bookExist.library_id === libraryId && bookExist.id !== book.id ){
                    throw new DuplicateBookRecordError()
                }
            })
        }

        const date = new Date()

        const updateBook = {
            bookId,
            title: clean(title) ?? book.title, 
            author: clean(author) ?? book.author , 
            description: clean(description) ?? book.description, 
            category: clean(category) ?? book.category, 
            edition: clean(edition) ?? book.edition, 
            finishing: clean(finishing) ?? book.finishing, 
            year_publi: clean(year_publi) ?? book.year_publi, 
            availability: availability ?? book.availability, 
            isbn: clean(isbn) ?? book.isbn, 
            dimensions: clean(dimensions) ?? book.dimensions, 
            page: verify(page) ?? book.page, 
            amount: verify(amount) ?? book.amount,
            updated_at: date.toISOString()
        }

        await this.booksRepository.updateBook(updateBook)
    }
}