import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface GetTopRatedBooksUseCaseResponse{
    books: Book[]
}

export class GetTopRatedBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute(): Promise<GetTopRatedBooksUseCaseResponse> {

        const books = await this.booksRepository.getBookTopRated()

        return{
            books
        }
    }
}