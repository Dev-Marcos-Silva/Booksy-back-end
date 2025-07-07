import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticationUseCase } from "../../../use-case/factories/make-authentication-use-case";
import { InvalidCredentialsError } from "../../../use-case/err/invalid-credetials-err";
import { getIdAccount } from "../../../utils/get-id-account";

export async function session(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = schemaRequest.parse(request.body)

    try{

        const authenticationUseCase = makeAuthenticationUseCase()

        const { account, user, library } = await authenticationUseCase.execute({email, password})

        const id = getIdAccount(user, library)
       
        const token = await reply.jwtSign(
            {
                role: account.type
            },
            {
                sign:{
                    sub: id,
                    expiresIn: '1d'
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                role: account.type
            },
            {
                sign:{
                    sub: id,
                    expiresIn: '7d'
                }
            }
        )

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({type: account.type, id: id, token})

    }catch(err){

        if(err instanceof InvalidCredentialsError){
            return reply.status(401).send({message: err.message})
        }

        throw err
    }
}