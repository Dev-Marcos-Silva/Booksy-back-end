import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"

interface RegisterFavoriteBookUseCaseRequest{
    userId: string
    bookId: string
}

interface RegisterFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook
}

export class RegisterFavoriteBookUseCase{
    
    constructor(
        private userRepository: UserRepository,
        private favoriteBookRepository: FavoriteBookRepository
    ){}

    async execute({userId, bookId}: RegisterFavoriteBookUseCaseRequest ): Promise<RegisterFavoriteBookUseCaseResponse> {

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

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