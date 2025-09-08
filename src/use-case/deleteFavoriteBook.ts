import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"
import { FavoriteBookNotFound } from "./err/favorite-book-not-found-err"

interface DeleteFavoriteBookUseCaseRequest{
    userId: string
    bookId: string
}

interface DeleteFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook | null
}

export class DeleteFavoriteBookUseCase{
    
    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId, bookId}: DeleteFavoriteBookUseCaseRequest ): Promise<DeleteFavoriteBookUseCaseResponse> {

        const favoriteBook = await this.favoriteBookRepository.getFavoriteBook(userId, bookId)

        if(!favoriteBook){
            throw new FavoriteBookNotFound()
        }

        await this.favoriteBookRepository.deleteFavoriteBook(userId, favoriteBook.id)
        
        return{
            favoriteBook
        }
    }
}