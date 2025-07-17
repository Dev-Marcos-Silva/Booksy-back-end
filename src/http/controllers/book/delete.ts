import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteRegisterBookUseCase } from "../../../use-case/factories/make-delete-register-book-use-case";

export async function deleteBook(request: FastifyRequest, reply: FastifyReply){

    const { id: bookId } = request.params as { id: string }

    try{

        const deleteRegisterBookUseCase = makeDeleteRegisterBookUseCase()

        await deleteRegisterBookUseCase.execute({bookId})

        return reply.status(200).send()

    }catch(err){

        throw err
    }
}