import { RentBook } from "@prisma/client"
import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { LibraryRepository } from "../repositories/libraries-repositories"
import { LibraryNotFoundError } from "./err/library-not-found-err"

interface FetchRendBookLibraryUseCaseRequest{
    libraryId: string
}

interface FetchRendBookLibraryUseCaseResponse{
    rendBook: RentBook[]
}

export class FetchRendBookLibraryUseCase{

    constructor(
        private libraryRepository: LibraryRepository,
        private rendBookRepository: RentedBookRepository 
    ){}

    async execute({ libraryId }: FetchRendBookLibraryUseCaseRequest ): Promise<FetchRendBookLibraryUseCaseResponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const rendBook = await this.rendBookRepository.fetchRendBookLibrary(libraryId)

        return{
            rendBook
        }
    }
}