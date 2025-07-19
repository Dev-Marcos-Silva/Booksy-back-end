import { FavoriteBook } from "@prisma/client"
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"

interface FetchFavoriteBookUseCaseRequest{
    userId: string
}

interface FetchFavoriteBookUseCaseResponse{
    favoriteBook: FavoriteBook[]
} 

export class FetchFavoriteBookUseCase{

    constructor(
        private userRepository: UserRepository,
        private favoriteBookRepository: FavoriteBookRepository
    ){}

    async execute({userId} : FetchFavoriteBookUseCaseRequest): Promise<FetchFavoriteBookUseCaseResponse>{

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const favoriteBook = await this.favoriteBookRepository.fetchFavoriteBook(userId)

        return{
            favoriteBook
        }
    }
}