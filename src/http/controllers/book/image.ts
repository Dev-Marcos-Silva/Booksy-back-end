import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateImageBookUseCase } from "../../../use-case/factories/make-update-image-book-use-case";
import { BookNotFoundError } from "../../../use-case/err/book-not-found-err";

export async function image(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        bookId: z.number().positive().int(),
        image: z.string().nullable()
    })

    const {bookId, image} = schemaRequest.parse(request.body)

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