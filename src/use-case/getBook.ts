import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";
import { BookNotFoundError } from "./err/book-not-found-err";

interface GetBooksUseCaseRequest{
    bookId: string
}

interface GetBooksUseCaseResponse{
    library_id: string
    author: string
    title: string
    image: string | null
    description: string
    dimensions: string
    availability: string
    category: string
    edition: string
    year_publi: string
    finishing: string
    page: number
    amount: number
}

export class GetBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ bookId }: GetBooksUseCaseRequest ): Promise<GetBooksUseCaseResponse> {

        const book = await this.booksRepository.getBookById(bookId)

        if(!book){
            throw new BookNotFoundError()
        }

        return{
            library_id: book.library_id,
            author: book.author,
            title: book.title,
            image: book.image,
            description: book.description,
            availability: book.availability,
            category: book.category,
            edition: book.edition,
            dimensions: book.dimensions,
            year_publi: book.year_publi,
            finishing: book.finishing,
            amount: book.amount,
            page: book.page   
        }
    }
}