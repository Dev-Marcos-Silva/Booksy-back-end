import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"

interface SearchBookTitleOrAuthorUseCaseRequest{
    query: string
}

interface SearchBookTitleOrAuthorUseCaseResponse{
    books: Book[]
}

export class SearchBookTitleOrAuthorUseCase{

    constructor(private bookRepository: BooksRepository ){}

    async execute({ query }: SearchBookTitleOrAuthorUseCaseRequest ): Promise<SearchBookTitleOrAuthorUseCaseResponse> {

        const books = await this.bookRepository.searchByTitleOrAuthor(query)

        return{
            books
        }
    }
}