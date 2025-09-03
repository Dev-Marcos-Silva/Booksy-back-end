import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateProfileLibraryUseCase } from "../../../use-case/factories/make-update-profile-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";
import { LibraryAlreadyExistsError } from "../../../use-case/err/library-already-exists-err";
import { InvalidCredentialsError } from "../../../use-case/err/invalid-credetials-err";

export async function update(request: FastifyRequest, reply: FastifyReply){
    
     const { id: libraryId } = request.params as {id: string}

    const schemaRequest = z.object({
        name: z.string(),
        email: z.string(),
        cep: z.string(),
        newPassword: z.string(),
        oldPassword: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.string(),
        ddd: z.string(),
        phone: z.string(),
    })

    const {name, email, cep, newPassword, oldPassword, city, neighborhood, number,street, ddd, phone } = schemaRequest.parse(request.body)

    try{

        const updateProfileLibraryUseCase = makeUpdateProfileLibraryUseCase()

        await updateProfileLibraryUseCase.execute({libraryId, name, email, cep, newPassword, oldPassword, city, neighborhood, number, street, ddd, phone,})

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