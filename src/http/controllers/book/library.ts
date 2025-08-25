import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllBooksUseCase } from "../../../use-case/factories/make-get-all-books-use-case";

export async function library(request: FastifyRequest, reply: FastifyReply){

    const {id: libraryId} = request.params as {id: string}

    try{

        const getAllBooksUseCase = makeGetAllBooksUseCase()

        const books = await getAllBooksUseCase.execute({libraryId})

        return reply.status(200).send(books)

    }catch(err){

        throw err
    }
}