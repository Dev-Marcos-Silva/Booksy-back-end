import { Comment } from "@prisma/client";
import { BookCommentRepository } from "../repositories/books-comment-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { UserNotFoundError } from "./err/user-not-found-err";

interface RegisterCommentUserUseCaseRequest{
    userId: string
    bookId: string
    text: string
}

interface RegisterCommentUserUseCaseResponse{
    comment: Comment
}

export class RegisterCommentUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private bookCommentRepository: BookCommentRepository 
    ){}

    async execute({userId, bookId, text}: RegisterCommentUserUseCaseRequest): Promise<RegisterCommentUserUseCaseResponse>{

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

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