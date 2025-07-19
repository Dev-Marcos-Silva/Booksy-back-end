import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { RegisterAssessmentUserUseCase } from "../registerAssessmentUser";

export function makeRegisterAssessmentUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const booksAssessmentRepository = new PrismaBooksAssessmentRepository()

    const registerAssessmentUserUseCase = new RegisterAssessmentUserUseCase(userRepository,booksAssessmentRepository)

    return registerAssessmentUserUseCase
}