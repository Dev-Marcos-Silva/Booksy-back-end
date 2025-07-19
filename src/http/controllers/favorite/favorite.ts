import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchFavoriteBookUseCase } from "../../../use-case/factories/make-fetch-favorite-book-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

export async function favorite(request: FastifyRequest, reply: FastifyReply){

    const {id: userId} = request.params as {id: string}

    try{

        const fetchFavoriteBookUseCase = makeFetchFavoriteBookUseCase()

        const {favoriteBook} = await fetchFavoriteBookUseCase.execute({userId})

        return reply.status(200).send({favoriteBook})

    }catch(err){

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}