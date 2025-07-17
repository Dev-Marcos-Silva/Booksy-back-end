import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"
import { BookNotFoundError } from "./err/book-not-found-err"

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

        if(!books){
            throw new BookNotFoundError()
        }

        return{
            books
        }
    }
}