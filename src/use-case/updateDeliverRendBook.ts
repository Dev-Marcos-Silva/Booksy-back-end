import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface UpdateDeliverRendBookUseCaseRequest{
    rentBookId: number
    dataDeliver: string
}

interface UpdateDeliverRendBookUseCaseResponse{
    book: RentBook
}

export class UpdateDeliverRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, dataDeliver }: UpdateDeliverRendBookUseCaseRequest): Promise<UpdateDeliverRendBookUseCaseResponse> {
        
        const { days } = await this.rendBookRepository.findRendBookId(rentBookId)

        const book = await this.rendBookRepository.updateOrderDeliver(
            rentBookId,
            dataDeliver,
            days
        )

        return{
            book
        }
    }
}