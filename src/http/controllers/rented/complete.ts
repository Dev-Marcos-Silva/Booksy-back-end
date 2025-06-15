import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateCompleteRendBookUseCase } from "../../../use-case/factories/make-update-complete-rented-book-use-case";

export async function complete(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        rentBookId: z.number().positive().int(),
        isComplete: z.enum(['true', 'false']),
        dataComplete: z.date()
    })

    const {rentBookId, isComplete, dataComplete} = schemaRequest.parse(request.body)

    try{

        const updateCompleteRendBookUseCase = makeUpdateCompleteRendBookUseCase()

        await updateCompleteRendBookUseCase.execute({rentBookId, isComplete, dataComplete})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}