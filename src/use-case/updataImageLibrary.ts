import { Library } from "@prisma/client"
import { LibraryRepository } from "../repositories/libraries-repositories"

interface UpdateImageLibraryUseCaseRequest{
    libraryId: string
    image: string | null
}

interface UpdateImageLibraryUseCaseResponse{
    library: Library
}

export class UpdateImageLibraryUseCase{
    
    constructor(private libraryRepository: LibraryRepository){}

    async execute({ libraryId, image }: UpdateImageLibraryUseCaseRequest ): Promise<UpdateImageLibraryUseCaseResponse> {

        const library = await this.libraryRepository.updateImage(
            libraryId,
            image
        )

        return{
            library
        }

    }
}