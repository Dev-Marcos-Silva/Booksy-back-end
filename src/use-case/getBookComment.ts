import { Comment } from "@prisma/client";
import { BookCommentRepository } from "../repositories/books-comment-repositories";

interface GetBookCommentUseCaseRequest{
    bookId: number
}

interface GetBookCommentUseCaseResponse{
    comment: Comment[]
}

export class GetBookCommentUseCase{

    constructor(private bookCommentRepository: BookCommentRepository ){}

    async execute({ bookId }: GetBookCommentUseCaseRequest): Promise<GetBookCommentUseCaseResponse>{

        const comment = await this.bookCommentRepository.getComment(bookId)

        return{
            comment
        }
    }
}