import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories"
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories"
import { RegisterBookUseCase } from "../registerBook"

export function makeRegisterBookUseCase(){

    const booksRepository = new PrismaBooksRepository()
    const libraryRepository = new PrismaLibrariesRepository()

    const registerBookUseCase = new RegisterBookUseCase(booksRepository, libraryRepository)

    return registerBookUseCase
}