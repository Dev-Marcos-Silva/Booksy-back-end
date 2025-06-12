import { PrismaLibrariesPhoneRepository } from "../../repositories/prisma/libraries-phone-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { RegisterPhoneLibraryUseCase } from "../registerPhoneLibrary"

export function makeRegisterPhoneLibraryUseCase(){

    const phoneLibraryRepository = new PrismaLibrariesPhoneRepository()
    const libraryRepository = new PrismaLibrariesRepository()

    const registerPhoneLibraryUseCase = new RegisterPhoneLibraryUseCase(phoneLibraryRepository, libraryRepository)

    return registerPhoneLibraryUseCase
}