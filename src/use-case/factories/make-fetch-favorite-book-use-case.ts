import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { FetchFavoriteBookUseCase } from "../fetchFavoriteBook";

export function makeFetchFavoriteBookUseCase(){

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const fetchFavoriteBookUseCase = new FetchFavoriteBookUseCase(favoriteBookRepository)

    return fetchFavoriteBookUseCase
}