import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { SearchBookTitleOrAuthorUseCase } from "../searchBookTitleOrAuthor";

export function makeSearchBookTitleOrAuthorUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const searchBookTitleOrAuthorUseCase = new SearchBookTitleOrAuthorUseCase(booksRepository, bookAssessmentRepository)

    return searchBookTitleOrAuthorUseCase
}