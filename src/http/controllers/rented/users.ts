import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchRentedBookUserUseCase } from "../../../use-case/factories/make-fetch-rented-book-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

export async function user(request: FastifyRequest, reply: FastifyReply){

    const {id: userId} = request.params as {id: string}

    try{

        const fetchRentedBookUserUseCase = makeFetchRentedBookUserUseCase()

        const { rendBook } = await fetchRentedBookUserUseCase.execute({userId})

        return reply.status(200).send({rendBook})

    }catch(err){

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        
        throw err
    }
}