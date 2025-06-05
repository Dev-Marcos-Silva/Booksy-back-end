import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";

interface GetAllBooksUseCaseRequest{
    libraryId: string
}

interface GetAllBooksUseCaseResponse{
    book: Book[]
}

export class GetAllBooksUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ libraryId }: GetAllBooksUseCaseRequest ): Promise<GetAllBooksUseCaseResponse> {

        const book = await this.booksRepository.getAllBook(libraryId)

        return{
            book
        }
    }
}