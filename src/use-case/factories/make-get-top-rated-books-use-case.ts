import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetTopRatedBooksUseCase } from "../getTopRatedBooks";

export function makeGetTopRatedBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const getTopRatedBooksUseCase = new GetTopRatedBooksUseCase(booksRepository)

    return getTopRatedBooksUseCase
}