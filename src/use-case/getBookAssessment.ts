import { BookAssessmentRepository } from "../repositories/books-assessment-repositories";
import { UserRepository } from "../repositories/users-repositories";

interface GetBookAssessmentUseCaseRequest{
    bookId: string
}

interface GetBookAssessmentUseCaseResponse{
    assessmentWithUser: {
        id: number
        created_at: Date
        star: number
        book_id: string
        user: {
            name: string | undefined
            avatar: string | null | undefined
        }
    }[]
}

export class GetBookAssessmentUseCase{

    constructor(
        private bookAssessmentRepository: BookAssessmentRepository,
        private userRepository: UserRepository 
    ){}

    async execute({ bookId }: GetBookAssessmentUseCaseRequest): Promise<GetBookAssessmentUseCaseResponse>{

        const assessments = await this.bookAssessmentRepository.getAssessment(bookId)

        const assessmentWithUser = await Promise.all(assessments.map(async assessment => {
            const user = await this.userRepository.findById(assessment.user_id)

            return{
                id: assessment.id,
                created_at: assessment.created_at,
                star: assessment.star,
                book_id: assessment.book_id,
                user: {
                    name: user?.name,
                    avatar: user?.avatar
                }
            }
        }))

        return{
            assessmentWithUser
        }
    }
}