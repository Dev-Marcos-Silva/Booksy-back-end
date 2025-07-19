import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterRentedBookUseCase } from "../../../use-case/factories/make-register-rented-book-use-case";
import { RegisterAddressOrPhoneError } from "../../../use-case/err/register-address-or-phone-err";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        days: z.number().positive().int(),
        bookId: z.string().uuid(),
        userId: z.string().uuid(),
        libraryId: z.string().uuid(),
    })

    const {days, bookId, userId, libraryId} = schemaRequest.parse(request.body)

    try{

        const registerRentedBookUseCase = makeRegisterRentedBookUseCase()

        await registerRentedBookUseCase.execute({days, bookId, userId, libraryId})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof RegisterAddressOrPhoneError){
            return reply.status(401).send({message: err.message})
        }
        
        throw err
    }
}