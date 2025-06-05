import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"

interface FetchRendBookLibraryUseCaseRequest{
    libraryId: string
}

interface FetchRendBookLibraryUseCaseResponse{
    rendBook: RentBook[]
}

export class FetchRendBookLibraryUseCase{

    constructor(private rendBookRepository: RentedBookRepository ){}

    async execute({ libraryId }: FetchRendBookLibraryUseCaseRequest ): Promise<FetchRendBookLibraryUseCaseResponse> {

        const rendBook = await this.rendBookRepository.fetchRendBookLibrary(libraryId)

        return{
            rendBook
        }
    }
}