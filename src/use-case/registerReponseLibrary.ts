import { LibraryResponseRepository } from "../repositories/library-response-repositories";

interface RegisterResponseLibraryUseCaseRequest{
    text: string
    commentId: number
    libraryId: string
} 

interface RegisterResponseLibraryUseCaseResponse{
    response: Response
}

export class RegisterResponseLibraryUseCase{

    constructor(private libraryResponseRepository: LibraryResponseRepository ){}

    async execute({libraryId, commentId, text}: RegisterResponseLibraryUseCaseRequest ): Promise<RegisterResponseLibraryUseCaseResponse> {

        const response = await this.libraryResponseRepository.register({
            response: text,
            comment:{
                connect: {id: commentId}
            },
            library: {
                connect: {id: libraryId}
            }
        })

        return{
            response
        }
    }
}