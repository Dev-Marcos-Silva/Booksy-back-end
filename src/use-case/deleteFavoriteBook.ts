import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"

interface DeleteFavoriteBookUseCaseRequest{
    userId: string
    bookId: number
}

interface DeleteFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook[]
}

export class DeleteFavoriteBookUseCase{
    
    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId, bookId}: DeleteFavoriteBookUseCaseRequest ): Promise<DeleteFavoriteBookUseCaseResponse> {

        const favoriteBook = await this.favoriteBookRepository.deleteFavoriteBook(userId, bookId)
        

        return{
            favoriteBook
        }
    }
}