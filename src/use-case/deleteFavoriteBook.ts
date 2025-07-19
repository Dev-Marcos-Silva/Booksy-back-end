import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"
import { FavoriteBookNotFound } from "./err/favorite-book-not-found-err"

interface DeleteFavoriteBookUseCaseRequest{
    userId: string
    favoriteBookId: number
}

interface DeleteFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook | null
}

export class DeleteFavoriteBookUseCase{
    
    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId, favoriteBookId}: DeleteFavoriteBookUseCaseRequest ): Promise<DeleteFavoriteBookUseCaseResponse> {

        const favoriteBook = await this.favoriteBookRepository.getFavoriteBook(favoriteBookId)

        if(!favoriteBook){
            throw new FavoriteBookNotFound()
        }

        await this.favoriteBookRepository.deleteFavoriteBook(userId, favoriteBookId)
        
        return{
            favoriteBook
        }
    }
}