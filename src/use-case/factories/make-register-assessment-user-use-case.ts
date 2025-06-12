import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { RegisterAssessmentUserUseCase } from "../registerAssessmentUser";

export function makeRegisterAssessmentUserUseCase(){

    const booksAssessmentRepository = new PrismaBooksAssessmentRepository()

    const registerAssessmentUserUseCase = new RegisterAssessmentUserUseCase(booksAssessmentRepository)

    return registerAssessmentUserUseCase
}