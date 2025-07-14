import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateImageLibraryUseCase } from "../../../use-case/factories/make-update-image-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { deleteImageAfterError } from "../../../utils/delete-image";

export async function avatar(request: FastifyRequest, reply: FastifyReply){

    const {id: libraryId} = request.params as {id: string}
      
    const image = request.image

    if(image === undefined){
        return reply.status(400).send({message: 'Not attributable to image type'})
    }

    try{

        const updateImageLibraryUseCase = makeUpdateImageLibraryUseCase()

        await updateImageLibraryUseCase.execute({libraryId, image})

        return reply.status(201).send()

    }catch(err){

        deleteImageAfterError('library', libraryId)

        if(err instanceof LibraryNotFoundError){
            return reply.status(404).send({message: err.message})
        }
               
        throw err
    }
}