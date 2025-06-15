import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterAssessmentUserUseCase } from "../../../use-case/factories/make-register-assessment-user-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        bookId: z.number().positive().int(),
        star: z.number().positive().int() 
    })

    const {userId, bookId, star} = schemaRequest.parse(request.body)

    try{
        
        const registerAssessmentUserUseCase = makeRegisterAssessmentUserUseCase()

        await registerAssessmentUserUseCase.execute({userId, bookId, star})

        return reply.status(201).send()

    }catch(err){

        throw err
    }
}