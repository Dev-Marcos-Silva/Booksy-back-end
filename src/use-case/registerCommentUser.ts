import { Comment } from "@prisma/client";
import { BookCommentRepository } from "../repositories/books-comment-repositories";

interface RegisterCommentUserUseCaseRequest{
    userId: string
    bookId: number
    text: string
}

interface RegisterCommentUserUseCaseResponse{
    comment: Comment
}

export class RegisterCommentUserUseCase{

    constructor(private bookCommentRepository: BookCommentRepository ){}

    async execute({userId, bookId, text}: RegisterCommentUserUseCaseRequest): Promise<RegisterCommentUserUseCaseResponse>{

        const comment = await this.bookCommentRepository.register({
            comment: text,
            book:{
                connect: {id: bookId}
            },
            user:{
                connect: {id: userId}
            }
        })

        return{
            comment
        }
    }
}