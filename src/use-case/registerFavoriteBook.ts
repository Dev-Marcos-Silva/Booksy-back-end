import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"

interface RegisterFavoriteBookUseCaseRequest{
    userId: string
    bookId: string
}

interface RegisterFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook
}

export class RegisterFavoriteBookUseCase{
    
    constructor(private favoriteBookRepository: FavoriteBookRepository){}

    async execute({userId, bookId}: RegisterFavoriteBookUseCaseRequest ): Promise<RegisterFavoriteBookUseCaseResponse> {

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