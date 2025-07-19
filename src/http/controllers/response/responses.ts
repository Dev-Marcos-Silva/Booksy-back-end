import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetLibraryResponseUseCase } from "../../../use-case/factories/make-get-response-library-use-case";

export async function response(request: FastifyRequest, reply: FastifyReply){

    const { id } = request.params as { id: number }

    const commentId = Number(id)

    try{

        const getLibraryResponseUseCase = makeGetLibraryResponseUseCase()

        const {response} = await getLibraryResponseUseCase.execute({commentId})

        return reply.status(200).send(response)

    }catch(err){

        throw err
    }
}