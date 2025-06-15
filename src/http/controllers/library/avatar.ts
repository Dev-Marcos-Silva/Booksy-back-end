import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateImageLibraryUseCase } from "../../../use-case/factories/make-update-image-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";

export async function avatar(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        libraryId: z.string().uuid(),
        image: z.string()
    })

    const {libraryId, image} = schemaRequest.parse(request.body)

    try{

        const updateImageLibraryUseCase = makeUpdateImageLibraryUseCase()

        await updateImageLibraryUseCase.execute({libraryId, image})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof LibraryNotFoundError){
            return reply.status(404).send({message: err.message})
        }
               
        throw err
    }
}