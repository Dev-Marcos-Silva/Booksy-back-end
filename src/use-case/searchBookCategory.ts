import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"

interface SearchBookCategoryUseCaseRequest{
    category: string
}

interface SearchBookCategoryUseCaseResponse{
    book: Book[]
}

export class SearchBookCategoryUseCase{

    constructor(private bookRepository: BooksRepository ){}

    async execute({ category }: SearchBookCategoryUseCaseRequest ): Promise<SearchBookCategoryUseCaseResponse> {

        const book = await this.bookRepository.searchByCategory(category)

        return{
            book
        }
    }
}