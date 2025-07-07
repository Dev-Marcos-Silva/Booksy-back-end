import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteRegisterBookUseCase } from "../../../use-case/factories/make-delete-register-book-use-case";

export async function deleteBook(request: FastifyRequest, reply: FastifyReply){

    const libraryId = request.user.sub

    const { id } = request.params as { id: string }

    const bookId = id

    try{

        const deleteRegisterBookUseCase = makeDeleteRegisterBookUseCase()

        await deleteRegisterBookUseCase.execute({libraryId, bookId})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}