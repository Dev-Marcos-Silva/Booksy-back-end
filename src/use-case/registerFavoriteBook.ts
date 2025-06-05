import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"

interface FavoriteBookUseCaseRequest{
    userId: string
    bookId: number
}

interface FavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook
}

export class FavoriteBookUseCase{
    
    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId, bookId}: FavoriteBookUseCaseRequest ): Promise<FavoriteBookUseCaseResponse> {

        const favoriteBook = await this.favoriteBookRepository.register({
            book:{
                connect: {id: bookId}
            },
            user: {
                connect: {id: userId}
            }
        })

        return{
            favoriteBook
        }
    }
}