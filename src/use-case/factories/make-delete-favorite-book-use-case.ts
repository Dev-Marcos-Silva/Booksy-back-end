import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { DeleteFavoriteBookUseCase } from "../deleteFavoriteBook";

export function makeDeleteFavoriteBookUseCase(){

    const favoriteBookRepository = new PrismaBooksFavoriteRepository

    const deleteFavoriteBookUseCase = new DeleteFavoriteBookUseCase(favoriteBookRepository)

    return deleteFavoriteBookUseCase
}