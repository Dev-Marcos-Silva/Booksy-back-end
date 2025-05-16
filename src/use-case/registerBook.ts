import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryNotFoundError } from "./err/library-not-found-err";

interface RegisterBookUseCaseRequest{
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
    libraryId: string    
}

interface RegisterBookUseCaseResponse{
    book: Book
}

export class RegisterBookUseCase{

    constructor(
        private booksRepository: BooksRepository,
        private libraryRepository: LibraryRepository
    ){}

    async execute({
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
        amount,  
        libraryId
    }: RegisterBookUseCaseRequest): Promise<RegisterBookUseCaseResponse> {

        const library_Id = await this.libraryRepository.findById(libraryId) 

        if(!library_Id){
            throw new LibraryNotFoundError()
        }

        const book = await this.booksRepository.createBook({
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
            amount,
            library: {
                connect: {id: libraryId}
            }    
        })

        return{
            book
        }
    }
}