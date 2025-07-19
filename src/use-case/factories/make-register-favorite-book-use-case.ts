import { PrismaBooksFavoriteRepository } from "../../repositories/prisma/books-prisma-favorite-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { RegisterFavoriteBookUseCase } from "../registerFavoriteBook";

export function makeRegisterFavoriteBookUseCase(){

    const userRepository = new PrismaUsersRespository()

    const favoriteBookRepository = new PrismaBooksFavoriteRepository()

    const registerFavoriteBookUseCase = new RegisterFavoriteBookUseCase(userRepository,favoriteBookRepository)

    return registerFavoriteBookUseCase
}