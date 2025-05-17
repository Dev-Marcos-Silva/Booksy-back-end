import { Assessment } from "@prisma/client"
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories"

interface RegisterAssessmentUserUseCaseRequest{
    userId: string
    bookId: number
    star: number 
}

interface RegisterAssessmentUserUseCaseResponse{
    assessment: Assessment
}

export class RegisterAssessmentUserUseCase{
    
    constructor(private booksAssessmentRepository: BookAssessmentRepository){}

    async execute({userId, bookId, star}: RegisterAssessmentUserUseCaseRequest): Promise<RegisterAssessmentUserUseCaseResponse> {

        const assessment = await this.booksAssessmentRepository.register({
            star,
            book: {
                connect: {id: bookId}
            },
            user: {
                connect: {id: userId}
            }
        })

        return{
            assessment
        }
    }
}