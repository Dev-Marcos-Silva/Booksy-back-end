import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"

interface FetchRendBookUserUseCaseRequest{
    userId: string
}

interface FetchRendBookUserUseCaseResponse{
    rendBook: RentBook[]
}

export class FetchRendBookUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private rendBookRepository: RentedBookRepository
    ){}

    async execute({ userId }: FetchRendBookUserUseCaseRequest ): Promise<FetchRendBookUserUseCaseResponse> {
        
        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const rendBook = await this.rendBookRepository.fetchRendBookUser(userId)

        return{
            rendBook
        }
    }
}