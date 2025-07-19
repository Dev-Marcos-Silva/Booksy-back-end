import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface UpdateAcceptRendBookUseCaseRequest{
    rentBookId: number
    isAccepted: 'true' | 'false'
}

export class UpdateAcceptRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({ rentBookId, isAccepted }: UpdateAcceptRendBookUseCaseRequest): Promise<void> {
        
        if(isAccepted === 'true'){
            await this.rendBookRepository.updateOrderAccepted(rentBookId,isAccepted)
        }

        if(isAccepted == 'false'){
            await this.rendBookRepository.deleteRendBookLibrary(rentBookId)
        }
        
    }
}