import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticationUseCase } from "../../../use-case/factories/make-authentication-use-case";
import { InvalidCredentialsError } from "../../../use-case/err/invalid-credetials-err";

export async function session(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = schemaRequest.parse(request.body)

    try{

        const authenticationUseCase = makeAuthenticationUseCase()

        const account = await authenticationUseCase.execute({email, password})

        return reply.status(200).send(account)

    }catch(err){

        if(err instanceof InvalidCredentialsError){
            return reply.status(401).send({message: err.message})
        }

        throw err
    }
}