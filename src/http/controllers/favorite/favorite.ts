import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFetchFavoriteBookUseCase } from "../../../use-case/factories/make-fetch-favorite-book-use-case";

export async function favorite(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
    })

    const {userId} = schemaRequest.parse(request.body)

    try{

        const fetchFavoriteBookUseCase = makeFetchFavoriteBookUseCase()

        const {favoriteBook} = await fetchFavoriteBookUseCase.execute({userId})

        return reply.status(200).send({favoriteBook})

    }catch(err){

        throw err
    }
}