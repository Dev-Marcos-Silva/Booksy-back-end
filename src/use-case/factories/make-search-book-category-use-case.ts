import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { SearchBookCategoryUseCase } from "../searchBookCategory";

export function makeSearchBookCategoryUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const searchBookCategoryUseCase = new SearchBookCategoryUseCase(booksRepository, bookAssessmentRepository)

    return searchBookCategoryUseCase
}