import { Assessment } from "@prisma/client";
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories";

interface GetBookAssessmentUseCaseRequest{
    bookId: number
}

interface GetBookAssessmentUseCaseResponse{
    assessments: Assessment[]
}

export class GetBookAssessmentUseCase{

    constructor(private bookAssessmentRepository: BookAssessmentRepository){}

    async execute({ bookId }: GetBookAssessmentUseCaseRequest): Promise<GetBookAssessmentUseCaseResponse>{

        const assessments = await this.bookAssessmentRepository.getAssessment(bookId)

        return{
            assessments
        }
    }
}