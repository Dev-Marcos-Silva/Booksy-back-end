import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterBookUseCase } from "../../../use-case/factories/make-register-book-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const libraryId = request.user.sub

    const schemaRequest = z.object({
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

    const {title, image, author, description, category, edition, finishing, year_publi, availability, isbn, dimensions, page, amount} = schemaRequest.parse(request.body)

    try{
        
        const registerBookUseCase = makeRegisterBookUseCase()

        await registerBookUseCase.execute({
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
            libraryId
        })

        return reply.status(201).send()

    }catch(err){

        if(err instanceof LibraryNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}