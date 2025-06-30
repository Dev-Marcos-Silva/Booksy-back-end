import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"

interface SearchBookCategoryUseCaseRequest{
    category: string
}

interface SearchBookCategoryUseCaseResponse{
    books: Book[]
}

export class SearchBookCategoryUseCase{

    constructor(private bookRepository: BooksRepository ){}

    async execute({ category }: SearchBookCategoryUseCaseRequest ): Promise<SearchBookCategoryUseCaseResponse> {

        const books = await this.bookRepository.searchByCategory(category)

        return{
            books
        }
    }
}