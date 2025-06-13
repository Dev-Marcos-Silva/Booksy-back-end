import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { UpdateAcceptRendBookUseCase } from "../updateAcceptRendBook";

export function makeUpdateAcceptRendBookUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const updateAcceptRendBookUseCase = new UpdateAcceptRendBookUseCase(rendBookRepository)

    return updateAcceptRendBookUseCase
}