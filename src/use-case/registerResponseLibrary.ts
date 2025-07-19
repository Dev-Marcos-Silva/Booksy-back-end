import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryResponseRepository } from "../repositories/library-response-repositories";
import { Response } from "@prisma/client";
import { LibraryNotFoundError } from "./err/library-not-found-err";
import { ResponseAlreadyExist } from "./err/response-already-exists-err";

interface RegisterResponseLibraryUseCaseRequest{
    text: string
    commentId: number
    libraryId: string
} 

interface RegisterResponseLibraryUseCaseResponse{
    response: Response
}

export class RegisterResponseLibraryUseCase{

    constructor(
        private libraryRepository: LibraryRepository,
        private libraryResponseRepository: LibraryResponseRepository
    ){}

    async execute({libraryId, commentId, text}: RegisterResponseLibraryUseCaseRequest ): Promise<RegisterResponseLibraryUseCaseResponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const responseExist = await this.libraryResponseRepository.getResponse(commentId)

        if(responseExist){
            throw new ResponseAlreadyExist()
        }
        
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