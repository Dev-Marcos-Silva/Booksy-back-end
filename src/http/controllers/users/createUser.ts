import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "../../../use-case/factories/make-create-user-use-case";
import { UserAlreadyExistsError } from "../../../use-case/err/user-already-exists-err";

export function createUser(request: FastifyRequest , reply: FastifyReply ){

    const schemaRequest = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password } = schemaRequest.parse(request.body)

    try{

        const createUserUseCase = makeCreateUserUseCase()

        createUserUseCase.execute({name, email, password})

    }catch(err){

        if(err instanceof UserAlreadyExistsError){
            reply.status(409).send({message: err.message})
        }

        throw err
    }

    reply.status(201).send()
}