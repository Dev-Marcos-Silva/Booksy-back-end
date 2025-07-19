import { PrismaLibrarisResponseRepository } from "../../repositories/prisma/libraries-prisma-response-repositories"
import { GetLibraryResponseUseCase } from "../getLibraryResponse"

export function makeGetLibraryResponseUseCase(){

    const libraryResponseRepository = new PrismaLibrarisResponseRepository()

    const getLibraryResponseUseCase = new GetLibraryResponseUseCase(libraryResponseRepository)

    return getLibraryResponseUseCase
}