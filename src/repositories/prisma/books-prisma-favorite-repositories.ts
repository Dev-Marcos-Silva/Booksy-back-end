import { Prisma } from "@prisma/client";
import { FavoriteBookRepository } from "../favorite-book-repositories";
import { prisma } from "../../lib";

export class PrismaBooksFavoriteRepository implements FavoriteBookRepository {

    async register(data: Prisma.FavoriteBookCreateInput) {

        const favoriteBook = await prisma.favoriteBook.create({data})

        return favoriteBook
    }

    async fetchFavoriteBook(userId: string) {

        const favoriteBooks = await prisma.favoriteBook.findMany({
            where:{
                user_id: userId
            }
        })
        
        return favoriteBooks
    }

    async deleteFavoriteBook(userId: string, favoriteBookId: number) {

        await prisma.favoriteBook.delete({
            where: {
                id: favoriteBookId,
                AND:{
                    user_id: userId
                }
            }
        })

        const favoriteBooks = await prisma.favoriteBook.findMany({
            where: {
                user_id: userId
            }
        })

        return favoriteBooks
    }

    async getFavoriteBook(favoriteBookId: number){

        const favorite = await prisma.favoriteBook.findUnique({
            where:{
                id: favoriteBookId
            }
        })

        return favorite 
    }
}