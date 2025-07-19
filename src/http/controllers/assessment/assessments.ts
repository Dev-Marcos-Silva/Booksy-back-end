import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetBooksAssessmentUseCase } from "../../../use-case/factories/make-get-book-assessment-use-case";

export async function assessments(request: FastifyRequest, reply: FastifyReply){

    const {id: bookId} = request.params as {id: string}

    try{

        const getBooksAssessmentUseCase = makeGetBooksAssessmentUseCase()

        const {assessments} = await getBooksAssessmentUseCase.execute({bookId})

        return reply.status(200).send(assessments)

    }catch(err){

        throw err
    }
}