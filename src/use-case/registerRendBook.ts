import { RentBook } from "@prisma/client";
import { RentedBookRepository } from "../repositories/rented-books-repositories";

interface RegisterRendBookUseCaseRequest{
    days: number
    bookId: number
    userId: string
    libraryId: string 
}

interface RegisterRendBookUseCaseResponse{
    rendBook: RentBook
}

export class RegisterRendBookUseCase{

    constructor(private rendBookRepository: RentedBookRepository){}

    async execute({userId, libraryId, bookId, days }: RegisterRendBookUseCaseRequest ): Promise<RegisterRendBookUseCaseResponse> {

        const rendBook = await this.rendBookRepository.createRendBook({
            days,
            book: {
                connect: {id: bookId}
            },
            user: {
                connect: {id: userId}
            },
            library: {
                connect: {id: libraryId}
            }
        })

        return{
            rendBook
        }

    }
}