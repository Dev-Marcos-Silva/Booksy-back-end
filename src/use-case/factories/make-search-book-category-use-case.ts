import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { SearchBookCategoryUseCase } from "../searchBookCategory";

export function makeSearchBookCategoryUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const searchBookCategoryUseCase = new SearchBookCategoryUseCase(booksRepository)

    return searchBookCategoryUseCase
}