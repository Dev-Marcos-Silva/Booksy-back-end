import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteRegisterBookUseCase } from "../../../use-case/factories/make-delete-register-book-use-case";

export async function deleteBook(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        libraryId: z.string().uuid(),
        bookId: z.number().positive().int()
    })

    const {libraryId, bookId} = schemaRequest.parse(request.body)

    try{

        const deleteRegisterBookUseCase = makeDeleteRegisterBookUseCase()

        await deleteRegisterBookUseCase.execute({libraryId, bookId})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}