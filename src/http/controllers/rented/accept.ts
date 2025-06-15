import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateAcceptRendBookUseCase } from "../../../use-case/factories/make-update-accept-rented-book-use-case";

export async function accept(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        rentBookId: z.number().positive().int(),
        isAccepted: z.enum(['true', 'false'])
    })

    const {rentBookId, isAccepted} = schemaRequest.parse(request.body)

    try{

        const updateAcceptRendBookUseCase = makeUpdateAcceptRendBookUseCase()

        await updateAcceptRendBookUseCase.execute({rentBookId, isAccepted})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}