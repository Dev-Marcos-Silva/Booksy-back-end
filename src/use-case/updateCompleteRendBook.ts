import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface UpdateCompleteRendBookUseCaseRequest{
    rentBookId: number
    isComplete: 'true' | 'false'
    endDate: Date
}

interface UpdateCompleteRendBookUseCaseResponse{
    book: RentBook
}

export class UpdateCompleteRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, isComplete, endDate }: UpdateCompleteRendBookUseCaseRequest): Promise<UpdateCompleteRendBookUseCaseResponse> {
        
        const book = await this.rendBookRepository.updatrOrderComplete(
            rentBookId,
            endDate,
            isComplete,
        )

        return{
            book
        }
    }
}