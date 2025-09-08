import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { SearchBookCategoryUseCase } from "../searchBookCategory";

export function makeSearchBookCategoryUseCase(){

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const searchBookCategoryUseCase = new SearchBookCategoryUseCase(booksRepository, bookAssessmentRepository, favoriteBookRepository)

    return searchBookCategoryUseCase
}