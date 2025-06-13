import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { UpdateRegisterBookUseCase } from "../updataRegisterBook";

export function makeUpdateRegisterBookUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const updateRegisterBookUseCase = new UpdateRegisterBookUseCase(booksRepository)

    return updateRegisterBookUseCase
}