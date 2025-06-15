import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterFavoriteBookUseCase } from "../../../use-case/factories/make-register-favorite-book-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        bookId: z.number().positive().int()
    })

    const {userId, bookId} = schemaRequest.parse(request.body)

    try{

        const registerFavoriteBookUseCase = makeRegisterFavoriteBookUseCase()

        await registerFavoriteBookUseCase.execute({userId, bookId})

        return reply.status(201).send()

    }catch(err){

        throw err
    }
}