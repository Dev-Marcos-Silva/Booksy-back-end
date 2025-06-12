import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { RegisterRendBookUseCase } from "../registerRendBook";

export function makeRegisterRentedBookUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const registerRentedBookUseCase = new RegisterRendBookUseCase(rendBookRepository)

    return registerRentedBookUseCase
}