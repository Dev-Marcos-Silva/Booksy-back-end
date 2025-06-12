import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { GetBookAssessmentUseCase } from "../getBookAssessment";

export function makeGetBooksAssessmentUseCase(){

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const getBooksAssessmentUseCase = new GetBookAssessmentUseCase(bookAssessmentRepository)

    return getBooksAssessmentUseCase
}