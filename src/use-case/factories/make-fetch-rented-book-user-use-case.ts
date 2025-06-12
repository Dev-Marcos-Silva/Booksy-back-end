import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories"
import { FetchRendBookUserUseCase } from "../fetchRendBookUser"

export function makeFetchRentedBookUserUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const fetchRentedBookUserUseCase = new FetchRendBookUserUseCase(rendBookRepository)

    return fetchRentedBookUserUseCase
}