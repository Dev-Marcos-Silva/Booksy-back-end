import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetBooksUseCase } from "../../../use-case/factories/make-get-book-use-case";
import { BookNotFoundError } from "../../../use-case/err/book-not-found-err";

export async function book(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        bookId: z.string().uuid()
    })

    const {bookId} = schemaRequest.parse(request.body)

    try{

        const getBooksUseCase = makeGetBooksUseCase()

        const {book} = await getBooksUseCase.execute({bookId})

        return reply.status(200).send({book})

    }catch(err){

        if(err instanceof BookNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}