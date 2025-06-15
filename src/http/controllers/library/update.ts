import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateProfileLibraryUseCase } from "../../../use-case/factories/make-update-profile-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";
import { LibraryAlreadyExistsError } from "../../../use-case/err/library-already-exists-err";
import { InvalidCredentialsError } from "../../../use-case/err/invalid-credetials-err";

export async function update(request: FastifyRequest, reply: FastifyReply){
    
    const schemaRequest = z.object({
        libraryId: z.string().uuid(),
        name: z.string(),
        email: z.string().email(),
        newPassword: z.string().min(6),
        oldPassword: z.string().min(6),
    })

    const {libraryId, name, email, newPassword, oldPassword} = schemaRequest.parse(request.body)

    try{

        const updateProfileLibraryUseCase = makeUpdateProfileLibraryUseCase()

        await updateProfileLibraryUseCase.execute({libraryId, name, email, newPassword, oldPassword})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof LibraryNotFoundError || err instanceof AccountNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        else if(err instanceof LibraryAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
        else if(err instanceof InvalidCredentialsError){
            return reply.status(401).send({message: err.message})
        }
        
        throw err
    }
}