import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { SearchBookTitleOrAuthorUseCase } from "../searchBookTitleOrAuthor";

export function makeSearchBookTitleOrAuthorUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const searchBookTitleOrAuthorUseCase = new SearchBookTitleOrAuthorUseCase(booksRepository)

    return searchBookTitleOrAuthorUseCase
}