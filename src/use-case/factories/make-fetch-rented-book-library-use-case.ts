import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories"
import { FetchRendBookLibraryUseCase } from "../fetchRendBookLibrary"

export function makeFetchRentedBookLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const rendBookRepository = new PrismaRentedBooksRepository()

    const fetchRentedBookLibraryUseCase = new FetchRendBookLibraryUseCase(libraryRepository,rendBookRepository)

    return fetchRentedBookLibraryUseCase
}