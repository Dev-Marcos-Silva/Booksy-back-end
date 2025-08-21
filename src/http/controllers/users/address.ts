import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeRegisterAddressUserUseCase } from "../../../use-case/factories/make-register-address-user-use-case";
import { makeRegisterPhoneUserUseCase } from "../../../use-case/factories/make-register-phone-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";

export async function address(request: FastifyRequest , reply: FastifyReply ){

    const { id: userId } = request.params as {id: string}

    if(!userId){
        reply.status(404).send({message: 'User not found.'})
    }

    const schemaRequest = z.object({
        cep: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.string(),
        ddd: z.string(),
        phone: z.string()
    })

    const {cep, city, neighborhood, street, number, ddd, phone } = schemaRequest.parse(request.body)

    try{

        const registerAddressUserUseCase = makeRegisterAddressUserUseCase()

        const registerPhoneUserUseCase = makeRegisterPhoneUserUseCase()

        await registerAddressUserUseCase.execute({cep, city, neighborhood, number, street, userId})

        await registerPhoneUserUseCase.execute({ddd, phone, userId})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof UserNotFoundError){
            return reply.status(409).send({message: err.message})
        }
       
        throw err
    }
}