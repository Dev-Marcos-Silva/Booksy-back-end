import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { DeleteRendBookHistoryUseCase } from "../deleteRendBookHistory";

export function makeDeleteRentedBookHistoryUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const deleteRentedBookHistoryUseCase = new DeleteRendBookHistoryUseCase(rendBookRepository)

    return deleteRentedBookHistoryUseCase
}