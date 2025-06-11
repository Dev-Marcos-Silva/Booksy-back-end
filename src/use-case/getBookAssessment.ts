import { Assessment } from "@prisma/client";
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories";

interface GetBookAssessmentUseCaseRequest{
    bookId: number
}

interface GetBookAssessmentUseCaseResponse{
    assessment: Assessment[]
}

export class GetBookAssessmentUseCase{

    constructor(private bookAssessmentRepository: BookAssessmentRepository){}

    async execute({ bookId }: GetBookAssessmentUseCaseRequest): Promise<GetBookAssessmentUseCaseResponse>{

        const assessment = await this.bookAssessmentRepository.getAssessment(bookId)

        return{
            assessment
        }
    }
}