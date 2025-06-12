import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetRecentBooksUseCase } from "../getRecentBooks";

export function makeGetRecentBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const getRecentBooksUseCase = new GetRecentBooksUseCase(booksRepository)

    return getRecentBooksUseCase
}