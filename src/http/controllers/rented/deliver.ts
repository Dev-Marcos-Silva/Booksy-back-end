import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateDeliverRendBookUseCase } from "../../../use-case/factories/make-update-deliver-rented-book-use-case";

export async function deliver(request: FastifyRequest, reply: FastifyReply){

    const { id } = request.params as { id: number}

    const rentBookId = Number(id)

    const dataDeliver = new Date()

    try{

        const updateDeliverRendBookUseCase = makeUpdateDeliverRendBookUseCase()

        await updateDeliverRendBookUseCase.execute({rentBookId, dataDeliver})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}