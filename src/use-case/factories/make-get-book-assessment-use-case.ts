import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { GetBookAssessmentUseCase } from "../getBookAssessment";

export function makeGetBooksAssessmentUseCase(){

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const userRepository = new PrismaUsersRespository()

    const getBooksAssessmentUseCase = new GetBookAssessmentUseCase(bookAssessmentRepository, userRepository)

    return getBooksAssessmentUseCase
}