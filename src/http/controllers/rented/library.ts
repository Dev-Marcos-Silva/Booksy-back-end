import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFetchRentedBookLibraryUseCase } from "../../../use-case/factories/make-fetch-rented-book-library-use-case";

export async function library(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        libraryId: z.string().uuid()
    })

    const {libraryId} = schemaRequest.parse(request.body)

    try{

        const fetchRentedBookLibraryUseCase = makeFetchRentedBookLibraryUseCase()

        const books = await fetchRentedBookLibraryUseCase.execute({libraryId})

        return reply.status(200).send({books})

    }catch(err){

        throw err
    }
}