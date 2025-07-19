import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFetchRentedBookHistoryUseCase } from "../../../use-case/factories/make-fetch-rented-book-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply){

    const { id: userId } = request.params as {id: string}

    try{

        const fetchRentedBookHistoryUseCase = makeFetchRentedBookHistoryUseCase()

        const {history} = await fetchRentedBookHistoryUseCase.execute({userId})

        return reply.status(200).send({history})

    }catch(err){

        throw err
    }
}