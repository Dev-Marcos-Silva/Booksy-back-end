import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";
import { BookNotFoundError } from "./err/book-not-found-err";

interface GetBooksUseCaseRequest{
    bookId: string
}

interface GetBooksUseCaseResponse{
    book: Book
}

export class GetBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ bookId }: GetBooksUseCaseRequest ): Promise<GetBooksUseCaseResponse> {

        const book = await this.booksRepository.getBookById(bookId)

        if(!book){
            throw new BookNotFoundError()
        }

        return{
            book
        }
    }
}