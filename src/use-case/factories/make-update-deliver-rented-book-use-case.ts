import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { UpdateDeliverRendBookUseCase } from "../updateDeliverRendBook";

export function makeUpdateDeliverRendBookUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const updateDeliverRendBookUseCase = new UpdateDeliverRendBookUseCase(rendBookRepository)

    return updateDeliverRendBookUseCase
}