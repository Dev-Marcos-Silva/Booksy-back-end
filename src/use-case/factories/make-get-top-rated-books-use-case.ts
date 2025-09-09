import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { GetTopRatedBooksUseCase } from "../getTopRatedBooks";

export function makeGetTopRatedBooksUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()
    
    const getTopRatedBooksUseCase = new GetTopRatedBooksUseCase(booksRepository, bookAssessmentRepository, favoriteBookRepository)

    return getTopRatedBooksUseCase
}