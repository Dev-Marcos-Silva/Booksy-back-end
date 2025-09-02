import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetBooksUseCase } from "../getBook";

export function makeGetBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const getBooksUseCase = new GetBooksUseCase(booksRepository, bookAssessmentRepository)

    return getBooksUseCase
}