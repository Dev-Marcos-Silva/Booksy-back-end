import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface UpdateAcceptRendBookUseCaseRequest{
    rentBookId: number
    isAccepted: 'true' | 'false'
}

interface UpdateAcceptRendBookUseCaseResponse{
    book: RentBook
}

export class UpdateAcceptRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, isAccepted }: UpdateAcceptRendBookUseCaseRequest): Promise<UpdateAcceptRendBookUseCaseResponse> {
        
        const book = await this.rendBookRepository.updateOrderAccepted(
            rentBookId,
            isAccepted
        )

        return{
            book
        }
    }
}