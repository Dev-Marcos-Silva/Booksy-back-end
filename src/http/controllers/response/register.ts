import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterResponseLibraryUseCase } from "../../../use-case/factories/make-register-response-library-use-case";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { ResponseAlreadyExist } from "../../../use-case/err/response-already-exists-err";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        libraryId: z.string().uuid(),
        commentId: z.number().positive().int(), 
        text: z.string()

    })
    
    const {libraryId, commentId, text} = schemaRequest.parse(request.body)

    try{

        const registerResponseLibraryUseCase = makeRegisterResponseLibraryUseCase()

        await registerResponseLibraryUseCase.execute({libraryId, commentId, text})

        return reply.status(201).send()

    }catch(err){

        if(err instanceof LibraryNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        else if(err instanceof ResponseAlreadyExist){
            return reply.status(208).send({message: err.message})
        }

        throw err
    }
}