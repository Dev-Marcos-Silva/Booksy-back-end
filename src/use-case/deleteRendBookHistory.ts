import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface DeleteRendBookHistoryUseCaseRequest{
    userId: string
    bookId: number
    userVisibility: 'True'
}

interface DeleteRendBookHistoryUseCaseResponse{
    history: RentBook[]
}

export class DeleteRendBookHistoryUseCase{

    constructor(private rendBookRepository: RentedBookRepository ){}

    async execute({ userId, bookId, userVisibility }: DeleteRendBookHistoryUseCaseRequest ): Promise<DeleteRendBookHistoryUseCaseResponse>{

        const history = await this.rendBookRepository.deleteRendBookUser(userId, bookId, userVisibility)

        return{
            history
        }
    }
}