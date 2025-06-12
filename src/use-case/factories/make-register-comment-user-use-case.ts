import { PrismaBooksCommentRepository } from "../../repositories/prisma/books-prisma-comment-repositories";
import { RegisterCommentUserUseCase } from "../registerCommentUser";

export function makeRegisterCommentUserUseCase(){
    
    const bookCommentRepository = new PrismaBooksCommentRepository()

    const registerCommentUserUseCase = new RegisterCommentUserUseCase(bookCommentRepository)

    return registerCommentUserUseCase
}