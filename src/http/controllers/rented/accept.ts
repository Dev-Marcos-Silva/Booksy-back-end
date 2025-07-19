import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateAcceptRendBookUseCase } from "../../../use-case/factories/make-update-accept-rented-book-use-case";

export async function accept(request: FastifyRequest, reply: FastifyReply){

    const { id } = request.params as { id: number}

    const rentBookId = Number(id)

    const schemaRequest = z.object({
        isAccepted: z.enum(['true', 'false'])
    })

    const {isAccepted} = schemaRequest.parse(request.body)

    try{

        const updateAcceptRendBookUseCase = makeUpdateAcceptRendBookUseCase()

        await updateAcceptRendBookUseCase.execute({rentBookId, isAccepted})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}