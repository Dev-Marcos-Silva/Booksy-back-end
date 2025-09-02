import { PrismaBooksCommentRepository } from "../../repositories/prisma/books-prisma-comment-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { GetBookCommentUseCase } from "../getBookComment"

export function makeGetBooksCommentUseCase(){

    const bookCommentRepository = new PrismaBooksCommentRepository()

    const userRepository = new PrismaUsersRespository()

    const getBooksCommentUseCase = new GetBookCommentUseCase(bookCommentRepository, userRepository)

    return getBooksCommentUseCase
}