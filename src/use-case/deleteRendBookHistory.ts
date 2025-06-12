import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface DeleteRendBookHistoryUseCaseRequest{
    rentBookId: number
    userId: string
    visibility: 'true' | 'false'
}

interface DeleteRendBookHistoryUseCaseResponse{
    history: RentBook
}

export class DeleteRendBookHistoryUseCase{

    constructor(private rendBookRepository: RentedBookRepository ){}

    async execute({ rentBookId, userId, visibility }: DeleteRendBookHistoryUseCaseRequest ): Promise<DeleteRendBookHistoryUseCaseResponse>{

        const history = await this.rendBookRepository.deleteRendBookUser(rentBookId ,userId, visibility)

        return{
            history
        }
    }
}