import { BooksRepository } from "../repositories/books-repositories"

interface DeleteRegisterBookUseCaseRequest{
    bookId: string
}

export class DeleteRegisterBookUseCase{

    constructor(private booksRepository: BooksRepository){}

    async execute({ bookId }: DeleteRegisterBookUseCaseRequest): Promise<void> {
        
        await this.booksRepository.deleteBookById(bookId)

    }
}