import { FavoriteBook, Prisma } from "@prisma/client";

export interface FavoriteBookRepository{

    register(data: Prisma.FavoriteBookCreateInput): Promise<FavoriteBook>

}