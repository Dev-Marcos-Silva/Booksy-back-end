import { Comment } from "@prisma/client";
import { BookCommentRepository } from "../repositories/books-comment-repositories";

interface GetBookCommentUseCaseRequest{
    bookId: number
}

interface GetBookCommentUseCaseResponse{
    comments: Comment[]
}

export class GetBookCommentUseCase{

    constructor(private bookCommentRepository: BookCommentRepository ){}

    async execute({ bookId }: GetBookCommentUseCaseRequest): Promise<GetBookCommentUseCaseResponse>{

        const comments = await this.bookCommentRepository.getComment(bookId)

        return{
            comments
        }
    }
}