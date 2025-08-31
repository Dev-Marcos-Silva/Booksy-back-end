import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetRecentBooksUseCase } from "../getRecentBooks";

export function makeGetRecentBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const getRecentBooksUseCase = new GetRecentBooksUseCase(booksRepository, bookAssessmentRepository)

    return getRecentBooksUseCase
}