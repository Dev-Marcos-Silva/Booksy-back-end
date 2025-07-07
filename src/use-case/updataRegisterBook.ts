import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface UpdateRegisterBookUseCaseRequest{
    bookId: string
    title: string
    image: string | null
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

interface UpdateRegisterBookUseCaseResponse{
    book: Book
}

export class UpdateRegisterBookUseCase{

    constructor(
        private booksRepository: BooksRepository,
    ){}

    async execute({ 
        bookId,
        title,
        image, 
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
        amount,}: UpdateRegisterBookUseCaseRequest): Promise<UpdateRegisterBookUseCaseResponse> {

        const book = await this.booksRepository.updateBook(
            bookId,
            title,
            image, 
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
            amount,
        ) 

        return{
            book
        }
    }
}