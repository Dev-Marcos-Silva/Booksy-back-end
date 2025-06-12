import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories";
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories";
import { CreateLibraryUseCase } from "../createLibrary";

export function makeCreateLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const accountRepository = new PrismaAccountsRepository()

    const createLibraryUseCase = new CreateLibraryUseCase(libraryRepository, accountRepository)

    return createLibraryUseCase
}