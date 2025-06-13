import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories";
import { UpdateImageLibraryUseCase } from "../updataImageLibrary";

export function makeUpdateImageLibraryUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const updateImageLibraryUseCase = new UpdateImageLibraryUseCase(libraryRepository)

    return updateImageLibraryUseCase
}