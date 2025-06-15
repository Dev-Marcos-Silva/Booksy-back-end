import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetAllBooksUseCase } from "../../../use-case/factories/make-get-all-books-use-case";

export async function library(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        libraryId: z.string().uuid()
    })

    const {libraryId} = schemaRequest.parse(request.body)

    try{

        const getAllBooksUseCase = makeGetAllBooksUseCase()

        const books = await getAllBooksUseCase.execute({libraryId})

        return reply.status(200).send({books})

    }catch(err){

        throw err
    }
}