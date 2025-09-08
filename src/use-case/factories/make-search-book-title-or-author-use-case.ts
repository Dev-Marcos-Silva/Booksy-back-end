import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { SearchBookTitleOrAuthorUseCase } from "../searchBookTitleOrAuthor";

export function makeSearchBookTitleOrAuthorUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const searchBookTitleOrAuthorUseCase = new SearchBookTitleOrAuthorUseCase(booksRepository, bookAssessmentRepository, favoriteBookRepository)

    return searchBookTitleOrAuthorUseCase
}