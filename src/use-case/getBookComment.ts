import { BookCommentRepository } from "../repositories/books-comment-repositories";
import { UserRepository } from "../repositories/users-repositories";

interface GetBookCommentUseCaseRequest{
    bookId: string
}

interface GetBookCommentUseCaseResponse{
    commentWithUser: {
        id: number
        created_at: Date
        comment: string
        book_id: string
        user: {
            name: string | undefined
            avatar: string | null | undefined
        }
    }[]
}

export class GetBookCommentUseCase{

    constructor(
        private bookCommentRepository: BookCommentRepository,
        private userRepository: UserRepository 
    ){}

    async execute({ bookId }: GetBookCommentUseCaseRequest): Promise<GetBookCommentUseCaseResponse>{

        const comments = await this.bookCommentRepository.getComment(bookId)

        const commentWithUser = await Promise.all(comments.map(async comment => {
            const user = await this.userRepository.findById(comment.user_id)

            return{
                id: comment.id,
                created_at: comment.created_at,
                comment: comment.comment,
                book_id: comment.book_id,
                user: {
                    name: user?.name,
                    avatar: user?.avatar
                }
            }
        }))

        return{
            commentWithUser
        }
    }
}