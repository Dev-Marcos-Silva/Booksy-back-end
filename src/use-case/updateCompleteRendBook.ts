import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface UpdateCompleteRendBookUseCaseRequest{
    rentBookId: number
    isComplete: 'true' | 'false'
}

interface UpdateCompleteRendBookUseCaseResponse{
    book: RentBook
}

export class UpdateCompleteRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, isComplete }: UpdateCompleteRendBookUseCaseRequest): Promise<UpdateCompleteRendBookUseCaseResponse> {
        
        const book = await this.rendBookRepository.updatrOrderComplete(
            rentBookId,
            isComplete,
        )

        return{
            book
        }
    }
}