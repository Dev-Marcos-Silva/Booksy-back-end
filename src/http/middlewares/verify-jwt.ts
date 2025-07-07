import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {

    try{

        //console.log("antes do jwtVerify")

        await request.jwtVerify({ onlyCookie: false })

        //console.log("depis do jwtVerify")

    }catch(err){

        return reply.status(401).send({message: 'Unauthorized.'})

    } 
}