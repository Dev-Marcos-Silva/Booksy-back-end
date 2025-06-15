import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateDeliverRendBookUseCase } from "../../../use-case/factories/make-update-deliver-rented-book-use-case";

export async function deliver(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        rentBookId: z.number().positive().int(),
        dataDeliver: z.date()
    })

    const {rentBookId, dataDeliver} = schemaRequest.parse(request.body)

    try{

        const updateDeliverRendBookUseCase = makeUpdateDeliverRendBookUseCase()

        await updateDeliverRendBookUseCase.execute({rentBookId, dataDeliver})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}