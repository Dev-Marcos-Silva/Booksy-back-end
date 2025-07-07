import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateLibraryUseCase } from "../../../use-case/factories/make-create-library-use-case";
import { makeRegisterAddressLibraryUseCase } from "../../../use-case/factories/make-register-address-library-use-case";
import { makeRegisterPhoneLibraryUseCase } from "../../../use-case/factories/make-register-phone-library-use-case";
import { LibraryAlreadyExistsError } from "../../../use-case/err/library-already-exists-err";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";
import { makeDeleteUserUseCase } from "../../../use-case/factories/make-delete-user-use-case";
import { deleteImageAfterError } from "../../../utils/delete-image";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){

    const libraryId = request.id

    const { id } = request.params as { id: string }

    const userId = id

    const image = request.image

    if(image === undefined){
        return reply.status(400).send({message: 'Not attributable to image type'})
    }

    if(!userId){
        reply.status(404).send({message: 'User not found.'})
    }

    const schemaRequest = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        cnpj: z.string(),
        description: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.string(),
        phone: z.string()
    })

    const {name, email, password, cnpj, description, city, neighborhood, street, number, phone} = schemaRequest.parse(request.body)

    try{

        const createLibraryUseCase = makeCreateLibraryUseCase()
        const registerAddressLibraryUseCase = makeRegisterAddressLibraryUseCase()
        const registerPhoneLibraryUseCase = makeRegisterPhoneLibraryUseCase()
        const deleteUserUseCase = makeDeleteUserUseCase()

        await createLibraryUseCase.execute({libraryId, name, image, email, password, cnpj, description})

        await registerAddressLibraryUseCase.execute({city, neighborhood, street, number, libraryId })

        await registerPhoneLibraryUseCase.execute({phone, libraryId})

        await deleteUserUseCase.execute({userId})
        
        reply.status(201).send()

    }catch(err){

        deleteImageAfterError('library',libraryId)

        if(err instanceof LibraryAlreadyExistsError){
            reply.status(409).send({message: err.message})
        }
        else if(err instanceof LibraryNotFoundError){
            reply.status(404).send({message: err.message})
        }

        throw err
    }
}