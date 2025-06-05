import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"

interface SearchBookTitleUseCaseRequest{
    title: string
}

interface SearchBookTitleUseCaseResponse{
    book: Book[]
}

export class SearchBookTitleUseCase{

    constructor(private bookRepository: BooksRepository ){}

    async execute({ title }: SearchBookTitleUseCaseRequest ): Promise<SearchBookTitleUseCaseResponse> {

        const book = await this.bookRepository.searchByTitle(title)

        return{
            book
        }
    }
}