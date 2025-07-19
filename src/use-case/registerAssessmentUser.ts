import { Assessment } from "@prisma/client"
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"
import { AssessmentAlreadyExist } from "./err/assessment-already-exists-err"

interface RegisterAssessmentUserUseCaseRequest{
    userId: string
    bookId: string
    star: number 
}

interface RegisterAssessmentUserUseCaseResponse{
    assessment: Assessment
}

export class RegisterAssessmentUserUseCase{
    
    constructor(
        private userRepository: UserRepository,
        private booksAssessmentRepository: BookAssessmentRepository
    ){}

    async execute({userId, bookId, star}: RegisterAssessmentUserUseCaseRequest): Promise<RegisterAssessmentUserUseCaseResponse> {

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const assessmentExist = await this.booksAssessmentRepository.getUserAssessment(bookId, userId)

        if(assessmentExist){
            throw new AssessmentAlreadyExist()
        }

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