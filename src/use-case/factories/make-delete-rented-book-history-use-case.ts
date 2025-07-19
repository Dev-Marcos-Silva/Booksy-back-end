import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { DeleteRendBookHistoryUseCase } from "../deleteRendBookHistory";

export function makeDeleteRentedBookHistoryUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const userRepository = new PrismaUsersRespository()

    const deleteRentedBookHistoryUseCase = new DeleteRendBookHistoryUseCase(rendBookRepository, userRepository)

    return deleteRentedBookHistoryUseCase
}