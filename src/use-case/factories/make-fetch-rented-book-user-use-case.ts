import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { FetchRendBookUserUseCase } from "../fetchRendBookUser"

export function makeFetchRentedBookUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const rendBookRepository = new PrismaRentedBooksRepository()

    const fetchRentedBookUserUseCase = new FetchRendBookUserUseCase(userRepository, rendBookRepository)

    return fetchRentedBookUserUseCase
}