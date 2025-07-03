import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";
import { BookNotFoundError } from "./err/book-not-found-err";

interface UpdateImageBookUseCaseRequest{
    bookId: number
    image: string | null
}

interface UpdateImageBookUseCaseResponse{
    bookUpdate: Book
}

export class UpdateImageBookUseCase{

    constructor(private bookRepository: BooksRepository){}

    async execute({bookId, image}: UpdateImageBookUseCaseRequest): Promise<UpdateImageBookUseCaseResponse>{

        const book = await this.bookRepository.getBookById(bookId)

        if(!book){
            throw new BookNotFoundError()
        }

        const bookUpdate = await this.bookRepository.updateImage(bookId, image)

        return{
            bookUpdate
        }
    }
}