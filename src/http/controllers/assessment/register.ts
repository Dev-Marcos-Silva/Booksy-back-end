import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterAssessmentUserUseCase } from "../../../use-case/factories/make-register-assessment-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";
import { AssessmentAlreadyExist } from "../../../use-case/err/assessment-already-exists-err";

export async function register(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        userId: z.string().uuid(),
        bookId: z.string().uuid(),
        star: z.number().positive().int() 
    })

    const {userId, bookId, star} = schemaRequest.parse(request.body)

    try{
        
        const registerAssessmentUserUseCase = makeRegisterAssessmentUserUseCase()

        await registerAssessmentUserUseCase.execute({userId, bookId, star})

        return reply.status(201).send()

    }catch(err){
        
        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        else if(err instanceof AssessmentAlreadyExist){
            return reply.status(208).send({message: err.message})
        }
        
        throw err
    }
}