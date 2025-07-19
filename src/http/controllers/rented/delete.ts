import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteRentedBookHistoryUseCase } from "../../../use-case/factories/make-delete-rented-book-history-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

export async function deleteHistory(request: FastifyRequest, reply: FastifyReply){

    const { id } = request.params as { id: number}

    const rentBookId = Number(id)

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        visibility: z.enum(['true', 'false'])
    })

    const { userId, visibility} = schemaRequest.parse(request.body)

    try{

        const deleteRentedBookHistoryUseCase = makeDeleteRentedBookHistoryUseCase()

        await deleteRentedBookHistoryUseCase.execute({rentBookId, userId, visibility})

        return reply.status(200).send()

    }catch(err){

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}