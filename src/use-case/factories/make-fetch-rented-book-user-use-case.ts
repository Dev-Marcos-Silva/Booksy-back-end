import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories"
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories"
import { PrismaLibrariesAddressRepository } from "../../repositories/prisma/libraries-address-prisma-repositories"
import { PrismaLibrariesPhoneRepository } from "../../repositories/prisma/libraries-phone-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { FetchRendBookUserUseCase } from "../fetchRendBookUser"

export function makeFetchRentedBookUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const rendBookRepository = new PrismaRentedBooksRepository()

    const accountRepository = new PrismaAccountsRepository()

    const libraryRepository = new PrismaLibrariesRepository()

    const addressLibraryRepository = new PrismaLibrariesAddressRepository()
        
    const phoneLibraryRepository = new PrismaLibrariesPhoneRepository()
    
    const booksRepository = new PrismaBooksRepository()
    
    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()
    
    const fetchRentedBookUserUseCase = new FetchRendBookUserUseCase(
        userRepository, 
        libraryRepository, 
        booksRepository, 
        phoneLibraryRepository,
        addressLibraryRepository, 
        accountRepository,
        bookAssessmentRepository,
        rendBookRepository
    )

    return fetchRentedBookUserUseCase
}