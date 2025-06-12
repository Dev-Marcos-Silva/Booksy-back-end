import { PrismaBooksCommentRepository } from "../../repositories/prisma/books-prisma-comment-repositories"
import { GetBookCommentUseCase } from "../getBookComment"

export function makeGetBooksCommentUseCase(){

    const bookCommentRepository = new PrismaBooksCommentRepository()

    const getBooksCommentUseCase = new GetBookCommentUseCase(bookCommentRepository)

    return getBooksCommentUseCase
}