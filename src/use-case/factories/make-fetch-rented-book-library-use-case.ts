import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories"
import { FetchRendBookLibraryUseCase } from "../fetchRendBookLibrary"

export function makeFetchRentedBookLibraryUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const fetchRentedBookLibraryUseCase = new FetchRendBookLibraryUseCase(rendBookRepository)

    return fetchRentedBookLibraryUseCase
}