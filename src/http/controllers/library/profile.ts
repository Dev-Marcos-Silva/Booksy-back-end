import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetProfileLibraryUseCase } from "../../../use-case/factories/make-get-profile-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";

export async function profile(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        libraryId: z.string().uuid()
    })

    const {libraryId} = schemaRequest.parse(request.body)

    try{

        const getProfileLibraryUseCase = makeGetProfileLibraryUseCase()

        const {library, account, address, phone} = await getProfileLibraryUseCase.execute({libraryId})

        return reply.status(200).send({
            library, 
            account, 
            address, 
            phone
        })

    }catch(err){

        if(err instanceof LibraryNotFoundError || err instanceof AccountNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        
        throw err
    }
}