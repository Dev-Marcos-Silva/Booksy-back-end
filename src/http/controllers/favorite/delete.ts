import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteFavoriteBookUseCase } from "../../../use-case/factories/make-delete-favorite-book-use-case";

export async function deleteFavorite(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        bookId: z.number().positive().int()
    })

    const {userId, bookId} = schemaRequest.parse(request.body)

    try{

        const deleteFavoriteBookUseCase = makeDeleteFavoriteBookUseCase()

        await deleteFavoriteBookUseCase.execute({userId, bookId})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}