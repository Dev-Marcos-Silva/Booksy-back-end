import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterCommentUserUseCase } from "../../../use-case/factories/make-register-comment-user-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        bookId: z.string().uuid(),
        text: z.string()
    })

    const {userId, bookId, text} = schemaRequest.parse(request.body)

    try{

        const registerCommentUserUseCase = makeRegisterCommentUserUseCase()

        await registerCommentUserUseCase.execute({userId, bookId, text})

        return reply.status(201).send()

    }catch(err){

        throw err
    }
}