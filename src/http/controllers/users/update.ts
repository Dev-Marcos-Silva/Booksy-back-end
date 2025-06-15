import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateProfileUserUseCase } from "../../../use-case/factories/make-update-profile-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";
import { UserAlreadyExistsError } from "../../../use-case/err/user-already-exists-err";
import { InvalidCredentialsError } from "../../../use-case/err/invalid-credetials-err";

export async function update(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        name: z.string(),
        email: z.string().email(),
        newPassword: z.string().min(6),
        oldPassword: z.string().min(6)
    })

    const {userId, name, email, newPassword, oldPassword} = schemaRequest.parse(request.body)

    try{

        const updateProfileUserUseCase = makeUpdateProfileUserUseCase()

        await updateProfileUserUseCase.execute({userId, name, email, newPassword, oldPassword})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof UserNotFoundError || err instanceof AccountNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        else if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
        else if(err instanceof InvalidCredentialsError){
            return reply.status(401).send({message: err.message})
        }

        throw err
    }
}