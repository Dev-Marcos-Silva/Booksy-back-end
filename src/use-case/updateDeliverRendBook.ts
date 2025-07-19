import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { BookNotFoundError } from "./err/book-not-found-err"

interface UpdateDeliverRendBookUseCaseRequest{
    rentBookId: number
    dataDeliver: Date
}

interface UpdateDeliverRendBookUseCaseResponse{
    book: RentBook
}

export class UpdateDeliverRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, dataDeliver }: UpdateDeliverRendBookUseCaseRequest): Promise<UpdateDeliverRendBookUseCaseResponse> {
        
        const rendBook = await this.rendBookRepository.findRendBookId(rentBookId)

        if(!rendBook){
            throw new BookNotFoundError()
        }

        const { days } = rendBook

        const returnData =  new Date(dataDeliver)
        returnData.setDate(returnData.getDate() + days)

        const book = await this.rendBookRepository.updateOrderDeliver(
            rentBookId,
            dataDeliver,
            returnData
        )

        return{
            book
        }
    }
}