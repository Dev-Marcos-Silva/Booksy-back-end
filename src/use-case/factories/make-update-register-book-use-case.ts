import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories";
import { UpdateRegisterBookUseCase } from "../updataRegisterBook";

export function makeUpdateRegisterBookUseCase(){

    const libraryRepository = new PrismaLibrariesRepository()

    const booksRepository = new PrismaBooksRepository()

    const updateRegisterBookUseCase = new UpdateRegisterBookUseCase(booksRepository, libraryRepository)

    return updateRegisterBookUseCase
}