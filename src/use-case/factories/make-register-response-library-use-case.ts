import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories";
import { PrismaLibrarisResponseRepository } from "../../repositories/prisma/libraries-prisma-response-repositories";
import { RegisterResponseLibraryUseCase } from "../registerResponseLibrary";

export function makeRegisterResponseLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const libraryResponseRepository = new PrismaLibrarisResponseRepository()

    const registerResponseLibraryUseCase = new RegisterResponseLibraryUseCase(libraryRepository,libraryResponseRepository)

    return registerResponseLibraryUseCase
}