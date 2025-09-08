import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetBooksUseCase } from "../getBook";

export function makeGetBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const getBooksUseCase = new GetBooksUseCase(booksRepository, bookAssessmentRepository, favoriteBookRepository)

    return getBooksUseCase
}