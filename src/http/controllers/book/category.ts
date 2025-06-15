import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSearchBookCategoryUseCase } from "../../../use-case/factories/make-search-book-category-use-case";

export async function category(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        category: z.string()
    })

    const {category} = schemaRequest.parse(request.body)

    try{

        const searchBookCategoryUseCase = makeSearchBookCategoryUseCase()

        const books = await searchBookCategoryUseCase.execute({category})

        return reply.status(200).send({books})

    }catch(err){

        throw err
    }
}