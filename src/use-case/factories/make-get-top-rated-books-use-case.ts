import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetTopRatedBooksUseCase } from "../getTopRatedBooks";

export function makeGetTopRatedBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()
    
    const getTopRatedBooksUseCase = new GetTopRatedBooksUseCase(booksRepository, bookAssessmentRepository)

    return getTopRatedBooksUseCase
}