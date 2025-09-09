import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetRecentBooksUseCase } from "../getRecentBooks";

export function makeGetRecentBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const getRecentBooksUseCase = new GetRecentBooksUseCase(booksRepository, bookAssessmentRepository, favoriteBookRepository)

    return getRecentBooksUseCase
}