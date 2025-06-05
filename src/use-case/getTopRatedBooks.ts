import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface GetTopRatedBooksUseCaseResponse{
    book: Book[]
}

export class GetTopRatedBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute(): Promise<GetTopRatedBooksUseCaseResponse> {

        const book = await this.booksRepository.getBookTopRated()

        return{
            book
        }
    }
}