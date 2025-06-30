import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileUserUseCase } from "../../../use-case/factories/make-get-profile-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";
import { AccountNotFoundError } from "../../../use-case/err/account-not-found-err";

export async function profile(request: FastifyRequest, reply: FastifyReply){

    const userId = request.user.sub

    try{

        const getProfileUserUseCase = makeGetProfileUserUseCase()

        const {user, account, address, phone} = await getProfileUserUseCase.execute({userId})

        return reply.status(200).send({
            user, 
            account, 
            address, 
            phone
        })

    }catch(err){

        if(err instanceof UserNotFoundError || err instanceof AccountNotFoundError){
            return reply.status(404).send({message: err.message})
        }

        throw err
    }
}