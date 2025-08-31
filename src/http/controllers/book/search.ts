import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSearchBookTitleOrAuthorUseCase } from "../../../use-case/factories/make-search-book-title-or-author-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
           query: z.string()
    })

    const {query} = schemaRequest.parse(request.query)

    try{

        const searchBookTitleOrAuthorUseCase = makeSearchBookTitleOrAuthorUseCase()

        const books = await searchBookTitleOrAuthorUseCase.execute({query})

        return reply.status(200).send(books)

    }catch(err){

        throw err
    }
}