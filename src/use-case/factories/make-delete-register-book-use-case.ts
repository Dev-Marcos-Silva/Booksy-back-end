import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { DeleteRegisterBookUseCase } from "../deleteRegisterBook";

export function makeDeleteRegisterBookUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const deleteRegisterBookUseCase = new DeleteRegisterBookUseCase(booksRepository)

    return deleteRegisterBookUseCase
}