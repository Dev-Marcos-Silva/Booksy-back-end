import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteRentedBookHistoryUseCase } from "../../../use-case/factories/make-delete-rented-book-history-use-case";

export async function deleteHistory(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        rentBookId: z.number().positive().int(),
        userId: z.string().uuid(),
        visibility: z.enum(['true', 'false'])
    })

    const {rentBookId, userId, visibility} = schemaRequest.parse(request.body)

    try{

        const deleteRentedBookHistoryUseCase = makeDeleteRentedBookHistoryUseCase()

        await deleteRentedBookHistoryUseCase.execute({rentBookId, userId, visibility})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}