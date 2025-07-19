import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateCompleteRendBookUseCase } from "../../../use-case/factories/make-update-complete-rented-book-use-case";

export async function complete(request: FastifyRequest, reply: FastifyReply){

    const { id } = request.params as { id: number}

    const rentBookId = Number(id)

    const schemaRequest = z.object({
        isComplete: z.enum(['true', 'false']),
    })

    const {isComplete} = schemaRequest.parse(request.body)

    try{

        const updateCompleteRendBookUseCase = makeUpdateCompleteRendBookUseCase()

        await updateCompleteRendBookUseCase.execute({rentBookId, isComplete})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}