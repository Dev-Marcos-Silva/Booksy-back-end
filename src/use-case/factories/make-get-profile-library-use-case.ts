import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaLibrariesAddressRepository } from "../../repositories/prisma/libraries-address-prisma-repositories"
import { PrismaLibrariesPhoneRepository } from "../../repositories/prisma/libraries-phone-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { GetProfileLibraryUseCase } from "../getProfileLibrary"

export function makeGetProfileLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository
    const accountsRepository = new PrismaAccountsRepository
    const addressRepository = new PrismaLibrariesAddressRepository
    const phoneRepository = new PrismaLibrariesPhoneRepository

    const getProfileLibraryUseCase = new GetProfileLibraryUseCase(libraryRepository, accountsRepository, addressRepository, phoneRepository)

    return getProfileLibraryUseCase
}