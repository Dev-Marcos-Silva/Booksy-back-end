import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetBooksCommentUseCase } from "../../../use-case/factories/make-get-book-comment-use-case";

export async function comments(request: FastifyRequest, reply: FastifyReply){

    const {id: bookId} = request.params as {id: string}

    try{

        const getBooksCommentUseCase = makeGetBooksCommentUseCase()

        const {comments} = await getBooksCommentUseCase.execute({bookId})

        return reply.status(200).send(comments)

    }catch(err){

        throw err
    }
}