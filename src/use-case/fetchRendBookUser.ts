import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface FetchRendBookUserUseCaseRequest{
    userId: string
}

interface FetchRendBookUserUseCaseResponse{
    rendBook: RentBook[]
}

export class FetchRendBookUserUseCase{

    constructor(private rendBookRepository: RentedBookRepository ){}

    async execute({ userId }: FetchRendBookUserUseCaseRequest ): Promise<FetchRendBookUserUseCaseResponse> {

        const rendBook = await this.rendBookRepository.fetchRendBookUser(userId)

        return{
            rendBook
        }
    }
}