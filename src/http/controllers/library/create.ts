import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateLibraryUseCase } from "../../../use-case/factories/make-create-library-use-case";
import { makeRegisterAddressLibraryUseCase } from "../../../use-case/factories/make-register-address-library-use-case";
import { makeRegisterPhoneLibraryUseCase } from "../../../use-case/factories/make-register-phone-library-use-case";
import { LibraryAlreadyExistsError } from "../../../use-case/err/library-already-exists-err";
import { LibraryNotFoundError } from "../../../use-case/err/library-not-found-err";

export async function create(request: FastifyRequest, reply: FastifyReply){

    const schemaRequest = z.object({
        image: z.string(),
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

    const {image, name, email, password, cnpj, description, city, neighborhood, street, number, phone} = schemaRequest.parse(request.body)


    try{

        const createLibraryUseCase = makeCreateLibraryUseCase()
        const registerAddressLibraryUseCase = makeRegisterAddressLibraryUseCase()
        const registerPhoneLibraryUseCase = makeRegisterPhoneLibraryUseCase()

        const { library } = await createLibraryUseCase.execute({name, image, email, password, cnpj, description})

        const libraryId = library.id

        await registerAddressLibraryUseCase.execute({city, neighborhood, street, number, libraryId })

        await registerPhoneLibraryUseCase.execute({phone, libraryId})

    }catch(err){

        if(err instanceof LibraryAlreadyExistsError){
            reply.status(409).send({message: err.message})
        }
        else if(err instanceof LibraryNotFoundError){
            reply.status(404).send({message: err.message})
        }

        throw err
    }

    reply.status(201).send()
}