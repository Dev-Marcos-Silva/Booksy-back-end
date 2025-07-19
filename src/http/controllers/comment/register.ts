import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterCommentUserUseCase } from "../../../use-case/factories/make-register-comment-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

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

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}