import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetAllBooksUseCase } from "../getAllBooks";

export function makeGetAllBooksUseCase(){

    const booksRepository = new PrismaBooksRepository

    const getAllBooksUseCase = new GetAllBooksUseCase(booksRepository)

    return getAllBooksUseCase
}