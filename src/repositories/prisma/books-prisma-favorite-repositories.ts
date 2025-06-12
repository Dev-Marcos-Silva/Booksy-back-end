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

    async deleteFavoriteBook(userId: string, bookId: number) {

        await prisma.favoriteBook.delete({
            where: {
                id: bookId,
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
}