import { Library } from "@prisma/client";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryAlreadyExistsError } from "./err/library-already-exists-err";
import { hash } from "bcryptjs";

interface CreateLibraryUseCaseRequest{
    name: string
    email: string
    password: string
    cnpj: string
    description: string
}

interface CreateLibraryUseCaseResponse{
    library: Library
}

export class CreateLibraryUseCase{
    
    constructor(private libraryRepository: LibraryRepository){}

    async execute({name, email, password, cnpj, description }: CreateLibraryUseCaseRequest ): Promise<CreateLibraryUseCaseResponse> {

        const libraryWithSameEmail = await this.libraryRepository.findByEmail(email)

        const libraryWithSameCnpj = await this.libraryRepository.findByCnpj(cnpj)

        if(libraryWithSameCnpj || libraryWithSameEmail ){
            throw new LibraryAlreadyExistsError()
        }

        const password_hash = await hash(password, 6)

        const library = await this.libraryRepository.createLibrary({
            name,
            email,
            cnpj,
            description,
            password: password_hash
        })

        return{
            library
        }

    }
}