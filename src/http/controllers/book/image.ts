import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateImageBookUseCase } from "../../../use-case/factories/make-update-image-book-use-case";
import { BookNotFoundError } from "../../../use-case/err/book-not-found-err";

export async function image(request: FastifyRequest, reply: FastifyReply){

    const {id: bookId} = request.params as {id: string}

    const image = request.image

    if(image === undefined){
        return reply.status(400).send({message: 'Not attributable to image type'})
    }

    try{

        const updateImageBookUseCase = makeUpdateImageBookUseCase()

        await updateImageBookUseCase.execute({bookId, image})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof BookNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}