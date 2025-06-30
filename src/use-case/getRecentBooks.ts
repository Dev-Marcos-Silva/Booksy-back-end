import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface GetRecentBooksUseCaseResponse{
    books: Book[]
}

export class GetRecentBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute(): Promise<GetRecentBooksUseCaseResponse> {

        const books = await this.booksRepository.getBookRecent()

        return{
            books
        }
    }
}