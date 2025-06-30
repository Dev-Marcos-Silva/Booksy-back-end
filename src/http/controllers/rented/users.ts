import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFetchRentedBookUserUseCase } from "../../../use-case/factories/make-fetch-rented-book-user-use-case";

export async function user(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid()
    })

    const {userId} = schemaRequest.parse(request.body)

    try{

        const fetchRentedBookUserUseCase = makeFetchRentedBookUserUseCase()

        const { rendBook } = await fetchRentedBookUserUseCase.execute({userId})

        return reply.status(200).send({rendBook})

    }catch(err){
        
        throw err
    }
}