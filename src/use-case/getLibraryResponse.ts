import { Response } from "@prisma/client";
import { LibraryResponseRepository } from "../repositories/library-response-repositories";

interface GetLibraryResponseUseCaseRequest{
    commentId: number
}

interface GetLibraryResponseUseCaseResponse{
    response: Response | null
}

export class GetLibraryResponseUseCase{

    constructor( private libraryResponseRepository: LibraryResponseRepository){}

    async execute({ commentId }: GetLibraryResponseUseCaseRequest): Promise<GetLibraryResponseUseCaseResponse>{

        const response = await this.libraryResponseRepository.getResponse(commentId)

        return{
            response
        }
    }
}