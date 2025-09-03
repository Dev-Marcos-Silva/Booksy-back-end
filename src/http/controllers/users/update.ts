import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateProfileUserUseCase } from "../../../use-case/factories/make-update-profile-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";
import { UserAlreadyExistsError } from "../../../use-case/err/user-already-exists-err";
import { InvalidCredentialsError } from "../../../use-case/err/invalid-credetials-err";

export async function update(request: FastifyRequest, reply: FastifyReply){

    const { id: userId } = request.params as {id: string}

    const schemaRequest = z.object({
        name: z.string(),
        email: z.string(),
        cep: z.string(),
        newPassword: z.string(),
        oldPassword: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.string(),
        ddd: z.string(),
        phone: z.string(),
    })

    const {name, email, cep, newPassword, oldPassword, city, neighborhood, number, street, ddd, phone} = schemaRequest.parse(request.body)

    try{

        const updateProfileUserUseCase = makeUpdateProfileUserUseCase()

        await updateProfileUserUseCase.execute({userId, name, email, cep, newPassword, oldPassword, city, neighborhood, number, street, ddd, phone})

        return reply.status(201).send()

    }catch(err){

        console.log(err)

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