import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { RegisterFavoriteBookUseCase } from "../registerFavoriteBook";

export function makeRegisterFavoriteBookUseCase(){

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const registerFavoriteBookUseCase = new RegisterFavoriteBookUseCase(favoriteBookRepository)

    return registerFavoriteBookUseCase
}