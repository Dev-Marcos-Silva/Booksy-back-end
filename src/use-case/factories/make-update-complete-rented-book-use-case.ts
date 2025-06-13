import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { UpdateCompleteRendBookUseCase } from "../updateCompleteRendBook";

export function makeUpdateCompleteRendBookUseCase(){
   
    const rendBookRepository = new PrismaRentedBooksRepository()

    const updateCompleteRendBookUseCase = new UpdateCompleteRendBookUseCase(rendBookRepository)

    return updateCompleteRendBookUseCase
}