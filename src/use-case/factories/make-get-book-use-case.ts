import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetBooksUseCase } from "../getBook";

export function makeGetBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const getBooksUseCase = new GetBooksUseCase(booksRepository)

    return getBooksUseCase
}