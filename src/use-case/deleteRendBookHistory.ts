import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"

interface DeleteRendBookHistoryUseCaseRequest{
    rentBookId: number
    userId: string
    visibility: 'true' | 'false'
}

interface DeleteRendBookHistoryUseCaseResponse{
    history: RentBook
}

export class DeleteRendBookHistoryUseCase{

    constructor(
        private rendBookRepository: RentedBookRepository,
        private userRepository: UserRepository 
    ){}

    async execute({ rentBookId, userId, visibility }: DeleteRendBookHistoryUseCaseRequest ): Promise<DeleteRendBookHistoryUseCaseResponse>{

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const history = await this.rendBookRepository.deleteRendBookUser(rentBookId ,userId, visibility)

        return{
            history
        }
    }
}