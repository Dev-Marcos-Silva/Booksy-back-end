import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"

interface DeleteFavoriteBookUseCaseRequest{
    userId: string
    favoriteBookId: number
}

interface DeleteFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook[]
}

export class DeleteFavoriteBookUseCase{
    
    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId, favoriteBookId}: DeleteFavoriteBookUseCaseRequest ): Promise<DeleteFavoriteBookUseCaseResponse> {

        const favoriteBook = await this.favoriteBookRepository.deleteFavoriteBook(userId, favoriteBookId)
        

        return{
            favoriteBook
        }
    }
}