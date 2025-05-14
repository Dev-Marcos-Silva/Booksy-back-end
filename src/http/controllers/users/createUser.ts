import { FastifyRequest, FastifyReply } from "fastify";
import { string, z } from "zod";

export function createUser(request: FastifyRequest , reply: FastifyReply ){

    const schemaRequest = z.object({
        name: z.string()

    })

}