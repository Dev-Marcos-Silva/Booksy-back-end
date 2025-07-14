import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateAvatarUserUseCase } from "../../../use-case/factories/make-update-avatar-user-use-case";
import { UserNotFoundError } from "../../../use-case/err/user-not-found-err";
import { deleteImage } from "../../../config/delete-image";
import { deleteImageAfterError } from "../../../utils/delete-image";

export async function avatar(request: FastifyRequest, reply: FastifyReply){

    const { id: userId } = request.params as {id: string}

    const avatar = request.image

    if(avatar === undefined){
        return reply.status(400).send({message: 'Not attributable to image type'})
    }
    
    try{

        const updateAvatarUserUseCase = makeUpdateAvatarUserUseCase()

        await updateAvatarUserUseCase.execute({userId, avatar})

        return reply.status(201).send()

    }catch(err){

        deleteImageAfterError('profile', userId)

        if(err instanceof UserNotFoundError){
            return reply.status(404).send({message: err.message})
        }
       
        throw err
    }
}