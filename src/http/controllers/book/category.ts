import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSearchBookCategoryUseCase } from "../../../use-case/factories/make-search-book-category-use-case";

export async function category(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string(),
        category: z.string()
    })

    const {userId, category} = schemaRequest.parse(request.query)

    try{

        const searchBookCategoryUseCase = makeSearchBookCategoryUseCase()

        const books = await searchBookCategoryUseCase.execute({userId, category})

        return reply.status(200).send(books)

    }catch(err){

        throw err
    }
}