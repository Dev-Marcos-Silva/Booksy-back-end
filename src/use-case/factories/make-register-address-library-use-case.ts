import { PrismaLibrariesAddressRepository } from "../../repositories/prisma/libraries-address-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { RegisterAddressLibraryUseCase } from "../registerAddressLibrary"

export function makeRegisterAddressLibraryUseCase(){

    const addressLibraryRepository = new PrismaLibrariesAddressRepository()
    const libraryRepository = new PrismaLibrariesRepository()

    const registerAddressLibraryUseCase = new RegisterAddressLibraryUseCase(addressLibraryRepository, libraryRepository)

    return registerAddressLibraryUseCase
}