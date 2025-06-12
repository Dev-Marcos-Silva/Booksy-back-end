import { PrismaLibrarisResponseRepository } from "../../repositories/prisma/libraries-prisma-response-repositories";
import { RegisterResponseLibraryUseCase } from "../registerResponseLibrary";

export function makeRegisterResponseLibraryUseCase(){

    const libraryResponseRepository = new PrismaLibrarisResponseRepository()

    const registerResponseLibraryUseCase = new RegisterResponseLibraryUseCase(libraryResponseRepository)

    return registerResponseLibraryUseCase
}