import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeCreateUserUseCase } from "../../../use-case/factories/make-create-user-use-case";
import { UserAlreadyExistsError } from "../../../use-case/err/user-already-exists-err";

export async function create(request: FastifyRequest , reply: FastifyReply ){

    const schemaRequest = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password } = schemaRequest.parse(request.body)

    try{

        const createUserUseCase = makeCreateUserUseCase()

        await createUserUseCase.execute({name, email, password})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
       
        throw err
    }
}