import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateAvatarUserUseCase } from "../../../use-case/factories/make-update-avatar-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

export async function avatar(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        avatar: z.string().nullable()
    })

    const {userId, avatar} = schemaRequest.parse(request.body)

    try{

        const updateAvatarUserUseCase = makeUpdateAvatarUserUseCase()

        await updateAvatarUserUseCase.execute({userId, avatar})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }
       
        throw err
    }
}