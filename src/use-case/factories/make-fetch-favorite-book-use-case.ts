import { PrismaBooksAssessmentRepository } from "../../repositories/prisma/books-prisma-assessment-repositories";
import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaBooksRepository } from "../../repositories/prisma/books-prisma-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { FetchFavoriteBookUseCase } from "../fetchFavoriteBook";

export function makeFetchFavoriteBookUseCase(){

    const userRepository = new PrismaUsersRespository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const booksRepository = new PrismaBooksRepository()

    const bookAssessmentRepository = new PrismaBooksAssessmentRepository()
    
    const fetchFavoriteBookUseCase = new FetchFavoriteBookUseCase(userRepository, favoriteBookRepository, booksRepository, bookAssessmentRepository)

    return fetchFavoriteBookUseCase
}