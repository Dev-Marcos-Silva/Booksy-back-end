import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateRegisterBookUseCase } from "../../../use-case/factories/make-update-register-book-use-case";
import { DuplicateBookRecordError } from "../../../use-case/err/duplicate-book-record.err";

export async function update(request: FastifyRequest, reply: FastifyReply){

    const {id: bookId} = request.params as {id: string}

    const schemaRequest = z.object({
        libraryId: z.string(),
        title: z.string(),
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

    const {libraryId, title, author, description, category, edition, finishing, year_publi, availability, isbn, dimensions, page, amount} = schemaRequest.parse(request.body)

    try{
        
        const updateRegisterBookUseCase = makeUpdateRegisterBookUseCase()

        await updateRegisterBookUseCase.execute({
            bookId,
            libraryId,
            title,  
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

        if(err instanceof DuplicateBookRecordError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}