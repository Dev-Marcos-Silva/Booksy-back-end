import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteFavoriteBookUseCase } from "../../../use-case/factories/make-delete-favorite-book-use-case";

export async function deleteFavorite(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        favoriteBookId: z.number().positive().int()
    })

    const {userId, favoriteBookId} = schemaRequest.parse(request.body)

    try{

        const deleteFavoriteBookUseCase = makeDeleteFavoriteBookUseCase()

        await deleteFavoriteBookUseCase.execute({userId, favoriteBookId})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}