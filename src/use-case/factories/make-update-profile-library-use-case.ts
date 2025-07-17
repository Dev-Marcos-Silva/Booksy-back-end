import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaLibrariesAddressRepository } from "../../repositories/prisma/libraries-address-prisma-repositories"
import { PrismaLibrariesPhoneRepository } from "../../repositories/prisma/libraries-phone-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { UpdateProfileLibraryUseCase } from "../updateProfileLibrary"

export function makeUpdateProfileLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()
    const accountsRepository = new PrismaAccountsRepository()
    const phoneLibraryRepository = new PrismaLibrariesPhoneRepository()
    const addressLibraryRepository = new PrismaLibrariesAddressRepository()
    
    const updateProfileLibraryUseCase = new UpdateProfileLibraryUseCase(libraryRepository, accountsRepository, addressLibraryRepository, phoneLibraryRepository)

    return updateProfileLibraryUseCase
}