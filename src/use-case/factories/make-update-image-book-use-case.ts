import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { UpdateImageBookUseCase } from "../updateImageBook";

export function makeUpdateImageBookUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const updateImageBookUseCase = new UpdateImageBookUseCase(booksRepository)

    return updateImageBookUseCase
}