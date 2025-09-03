import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories"
import { PrismaUsersAddressRepository } from "../../repositories/prisma/users-address-prisma-repositories"
import { PrismaUsersPhoneRepository } from "../../repositories/prisma/users-phone-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { FetchRendBookLibraryUseCase } from "../fetchRendBookLibrary"

export function makeFetchRentedBookLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const rendBookRepository = new PrismaRentedBooksRepository()

    const accountRepository = new PrismaAccountsRepository()
    
    const userRepository = new PrismaUsersRespository()

    const addressUserRepository = new PrismaUsersAddressRepository()

    const phoneUserRepository = new PrismaUsersPhoneRepository()

    const booksRepository = new PrismaBooksRepository()

    const fetchRentedBookLibraryUseCase = new FetchRendBookLibraryUseCase(
        libraryRepository, 
        userRepository, 
        booksRepository, 
        phoneUserRepository,
        addressUserRepository,
        accountRepository, 
        rendBookRepository
    )

    return fetchRentedBookLibraryUseCase
}