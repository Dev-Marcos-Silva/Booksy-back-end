import { Library } from "@prisma/client"
import { LibraryRepository } from "../repositories/libraries-repositories"
import { LibraryNotFoundError } from "./err/library-not-found-err"

interface UpdateImageLibraryUseCaseRequest{
    libraryId: string
    image: string | null
}

interface UpdateImageLibraryUseCaseResponse{
    libraryUpdate: Library
}

export class UpdateImageLibraryUseCase{
    
    constructor(private libraryRepository: LibraryRepository){}

    async execute({ libraryId, image }: UpdateImageLibraryUseCaseRequest ): Promise<UpdateImageLibraryUseCaseResponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const libraryUpdate = await this.libraryRepository.updateImage(
            libraryId,
            image
        )

        return{
            libraryUpdate
        }

    }
}