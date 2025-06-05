import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface GetBooksUseCaseRequest{
    bookId: number
}

interface GetBooksUseCaseResponse{
    book: Book
}

export class GetBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ bookId }: GetBooksUseCaseRequest ): Promise<GetBooksUseCaseResponse> {

        const book = await this.booksRepository.getBookById(bookId)

        return{
            book
        }
    }
}