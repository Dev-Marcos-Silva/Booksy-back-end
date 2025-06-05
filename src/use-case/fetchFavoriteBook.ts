import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"

interface FetchFavoriteBookUseCaseRequest{
    userId: string
}

interface FetchFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook[]
} 

export class FetchFavoriteBookUseCase{

    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId} : FetchFavoriteBookUseCaseRequest): Promise<FetchFavoriteBookUseCaseResponse>{

        const favoriteBook = await this.favoriteBookRepository.fetchFavoriteBook(userId)

        return{
            favoriteBook
        }
    }
}