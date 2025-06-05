import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface GetRecentBooksUseCaseResponse{
    book: Book[]
}

export class GetRecentBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute(): Promise<GetRecentBooksUseCaseResponse> {

        const book = await this.booksRepository.getBookRecent()

        return{
            book
        }
    }
}