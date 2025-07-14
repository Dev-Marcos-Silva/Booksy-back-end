import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories";
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories";
import { DeleteLibraryUseCase } from "../deleteLibrary";

export function makeDeleteLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const accountRepository = new PrismaAccountsRepository()

    const deleteLibraryUseCase = new DeleteLibraryUseCase(libraryRepository, accountRepository)

    return deleteLibraryUseCase
}