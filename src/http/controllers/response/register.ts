import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterResponseLibraryUseCase } from "../../../use-case/factories/make-register-response-library-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const libraryId = request.user.sub

    const schemaRequest = z.object({
        commentId: z.number().positive().int(), 
        text: z.string()

    })
    
    const {commentId, text} = schemaRequest.parse(request.body)

    try{

        const registerResponseLibraryUseCase = makeRegisterResponseLibraryUseCase()

        await registerResponseLibraryUseCase.execute({libraryId, commentId, text})

        return reply.status(201).send()

    }catch(err){

        throw err
    }
}