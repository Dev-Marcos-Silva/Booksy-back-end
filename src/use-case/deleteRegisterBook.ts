import { Book } from "@prisma/client"
import { BooksRepository } from "../repositories/books-repositories"

interface DeleteRegisterBookUseCaseRequest{
    bookId: number
    libraryId: string
}

interface DeleteRegisterBookUseCaseResponse{
    book: Book[]
}

export class DeleteRegisterBookUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ bookId, libraryId }: DeleteRegisterBookUseCaseRequest): Promise<DeleteRegisterBookUseCaseResponse> {
        
        const book = await this.booksRepository.deleteBookById(bookId, libraryId)

        return{
            book
        }
    }
}