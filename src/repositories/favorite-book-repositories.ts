import { FavoriteBook, Prisma } from "@prisma/client";

export interface FavoriteBookRepository{

    register(data: Prisma.FavoriteBookCreateInput): Promise<FavoriteBook>

    fetchFavoriteBook(userId: string): Promise<FavoriteBook[]>

    deleteFavoriteBook(userId: string, favoriteBookId: number): Promise<FavoriteBook[]>

    getFavoriteBook(favoriteBookId: number): Promise<FavoriteBook | null>

}