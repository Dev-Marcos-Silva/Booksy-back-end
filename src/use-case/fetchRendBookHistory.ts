import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface FetchRendBookHistoryUseCaseRequest{
    userId: string
}

interface FetchRendBookHistoryUseCaseResponse{
    history: RentBook[] 
}

export class FetchRendBookHistoryUseCase{

    constructor(private rendBookRepository: RentedBookRepository ){}

    async execute({ userId }: FetchRendBookHistoryUseCaseRequest ): Promise<FetchRendBookHistoryUseCaseResponse>{

        const history = await this.rendBookRepository.fetchRendBookHistory(userId)

        return{
            history
        }
    }
}