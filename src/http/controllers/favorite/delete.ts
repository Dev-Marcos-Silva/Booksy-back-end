import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteFavoriteBookUseCase } from "../../../use-case/factories/make-delete-favorite-book-use-case";
import { FavoriteBookNotFound } from "../../../use-case/err/favorite-book-not-found-err";

export async function deleteFavorite(request: FastifyRequest, reply: FastifyReply){

    const { id } = request.params as { id: number}

    const favoriteBookId = Number(id)

    const schemaRequest = z.object({
        userId: z.string().uuid(),
    })

    const {userId} = schemaRequest.parse(request.body)

    try{

        const deleteFavoriteBookUseCase = makeDeleteFavoriteBookUseCase()

        await deleteFavoriteBookUseCase.execute({userId, favoriteBookId})

        return reply.status(200).send()

    }catch(err){

        if(err instanceof FavoriteBookNotFound){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}