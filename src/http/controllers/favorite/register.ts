import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterFavoriteBookUseCase } from "../../../use-case/factories/make-register-favorite-book-use-case";
import z from "zod";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        bookId: z.string().uuid()
    })

    const {userId, bookId} = schemaRequest.parse(request.body)

    try{

        const registerFavoriteBookUseCase = makeRegisterFavoriteBookUseCase()

        await registerFavoriteBookUseCase.execute({userId, bookId})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}