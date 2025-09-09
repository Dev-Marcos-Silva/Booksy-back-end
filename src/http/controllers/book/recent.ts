import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetRecentBooksUseCase } from "../../../use-case/factories/make-get-recent-books-use-case";

export async function recent(request: FastifyRequest, reply: FastifyReply){

    const {id: userId} = request.params as {id: string}

    try{

        const getRecentBooksUseCase = makeGetRecentBooksUseCase()

        const books = await getRecentBooksUseCase.execute({userId})

        return reply.status(200).send(books)

    }catch(err){

        throw err
    }
}