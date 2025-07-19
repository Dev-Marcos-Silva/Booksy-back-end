import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchRentedBookLibraryUseCase } from "../../../use-case/factories/make-fetch-rented-book-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";

export async function library(request: FastifyRequest, reply: FastifyReply){

    const {id: libraryId} = request.params as {id: string}

    try{

        const fetchRentedBookLibraryUseCase = makeFetchRentedBookLibraryUseCase()

        const {rendBook} = await fetchRentedBookLibraryUseCase.execute({libraryId})

        return reply.status(200).send({rendBook})

    }catch(err){

        if(err instanceof LibraryNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}