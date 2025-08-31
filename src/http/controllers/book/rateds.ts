import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetTopRatedBooksUseCase } from "../../../use-case/factories/make-get-top-rated-books-use-case";

export async function rateds(request: FastifyRequest, reply: FastifyReply){

    try{

        const getTopRatedBooksUseCase = makeGetTopRatedBooksUseCase()

        const books = await getTopRatedBooksUseCase.execute()

        return reply.status(200).send(books)

    }catch(err){

        throw err
    }
}