import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAccountRole(request: FastifyRequest, reply: FastifyReply) {

        await request.jwtVerify({ onlyCookie: false })

        const { role } = request.user

        if(role !== "LIBRARY"){
            return reply.status(401).send({message: 'Unauthorized.'})
        } 
}