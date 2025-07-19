import { PrismaBooksCommentRepository } from "../../repositories/prisma/books-prisma-comment-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { RegisterCommentUserUseCase } from "../registerCommentUser";

export function makeRegisterCommentUserUseCase(){

    const userRepository = new PrismaUsersRespository()
    
    const bookCommentRepository = new PrismaBooksCommentRepository()

    const registerCommentUserUseCase = new RegisterCommentUserUseCase(userRepository, bookCommentRepository)

    return registerCommentUserUseCase
}