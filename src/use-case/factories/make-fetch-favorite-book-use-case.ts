import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { FetchFavoriteBookUseCase } from "../fetchFavoriteBook";

export function makeFetchFavoriteBookUseCase(){

    const userRepository = new PrismaUsersRespository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const fetchFavoriteBookUseCase = new FetchFavoriteBookUseCase(userRepository, favoriteBookRepository)

    return fetchFavoriteBookUseCase
}