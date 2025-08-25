import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileLibraryUseCase } from "../../../use-case/factories/make-get-profile-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";

export async function profile(request: FastifyRequest, reply: FastifyReply){

    const { id: libraryId } = request.params as { id: string }

    try{

        const getProfileLibraryUseCase = makeGetProfileLibraryUseCase()

        const library = await getProfileLibraryUseCase.execute({libraryId})

        return reply.status(200).send(library)

    }catch(err){

        if(err instanceof LibraryNotFoundError || err instanceof AccountNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        
        throw err
    }
}