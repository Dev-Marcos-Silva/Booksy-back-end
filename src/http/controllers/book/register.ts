import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterBookUseCase } from "../../../use-case/factories/make-register-book-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { DuplicateBookRecordError } from "../../../use-case/err/duplicate-book-record.err";
import { deleteImageAfterError } from "../../../utils/delete-image";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const {id: libraryId} = request.params as {id: string}

    const bookId = request.id

    const image = request.image

    if(!image){
        return reply.status(400).send({message: 'Not attributable to image type'})
    }

    const schemaRequest = z.object({
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

    const {title, author, description, category, edition, finishing, year_publi, availability, isbn, dimensions, page, amount} = schemaRequest.parse(request.body)

    try{
        
        const registerBookUseCase = makeRegisterBookUseCase()

        await registerBookUseCase.execute({
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
            libraryId
        })

        return reply.status(201).send()

    }catch(err){

        deleteImageAfterError('book', bookId)

        if(err instanceof LibraryNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        else if(err instanceof DuplicateBookRecordError){
            return reply.status(409).send({message: err.message})   
        }

        throw err
    }
}