import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { BookNotFoundError } from "./err/book-not-found-err"

interface UpdateDeliverRendBookUseCaseRequest{
    rentBookId: number
    deliverDate: Date
}

interface UpdateDeliverRendBookUseCaseResponse{
    book: RentBook
}

export class UpdateDeliverRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, deliverDate }: UpdateDeliverRendBookUseCaseRequest): Promise<UpdateDeliverRendBookUseCaseResponse> {
        
        const rendBook = await this.rendBookRepository.findRendBookId(rentBookId)

        if(!rendBook){
            throw new BookNotFoundError()
        }

        const { days } = rendBook

        const returnDate =  new Date(deliverDate)
        returnDate.setDate(returnDate.getDate() + days)

        const book = await this.rendBookRepository.updateOrderDeliver(
            rentBookId,
            deliverDate,
            returnDate
        )

        return{
            book
        }
    }
}