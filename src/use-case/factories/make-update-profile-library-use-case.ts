import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { UpdateProfileLibraryUseCase } from "../updateProfileLibrary"

export function makeUpdateProfileLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()
    const accountsRepository = new PrismaAccountsRepository()

    const updateProfileLibraryUseCase = new UpdateProfileLibraryUseCase(libraryRepository, accountsRepository)

    return updateProfileLibraryUseCase
}