import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateRegisterBookUseCase } from "../../../use-case/factories/make-update-register-book-use-case";

export async function update(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        bookId: z.string().uuid(),
        title: z.string(),
        image: z.string().nullable(),
        author: z.string(),
        description: z.string(),
        category: z.string(),
        edition: z.string(),
        finishing: z.string(),
        year_publi: z.string(),
        availability: z.enum(['available','unavailable']),
        isbn: z.string(),
        dimensions: z.string(),
        page: z.number(),           
        amount: z.number(),
    })

    const {bookId, title, image, author, description, category, edition, finishing, year_publi, availability, isbn, dimensions, page, amount} = schemaRequest.parse(request.body)

    try{
        
        const updateRegisterBookUseCase = makeUpdateRegisterBookUseCase()

        await updateRegisterBookUseCase.execute({
            bookId,
            title, 
            image, 
            author, 
            description, 
            category, 
            edition, 
            finishing, 
            year_publi, 
            availability, 
            isbn, 
            dimensions, 
            page, 
            amount, 
        })

        return reply.status(201).send()

    }catch(err){

        throw err
    }
}