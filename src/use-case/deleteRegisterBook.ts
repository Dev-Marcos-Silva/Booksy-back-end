import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"

interface DeleteRegisterBookUseCaseRequest{
    bookId: number
}

interface DeleteRegisterBookUseCaseResponse{
    book: Book[]
}

export class DeleteRegisterBookUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ bookId }: DeleteRegisterBookUseCaseRequest): Promise<DeleteRegisterBookUseCaseResponse> {
        
        const book = await this.booksRepository.deleteBookById(bookId)

        return{
            book
        }
    }
}