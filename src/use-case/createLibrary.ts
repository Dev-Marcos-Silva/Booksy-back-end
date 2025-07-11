import { Library } from "@prisma/client";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryAlreadyExistsError } from "./err/library-already-exists-err";
import { hash } from "bcryptjs";
import { AccountsRepository } from "../repositories/accounts-repositories";

interface CreateLibraryUseCaseRequest{
    libraryId: string
    name: string
    image: string | null
    email: string
    password: string
    cnpj: string
    description: string
}

interface CreateLibraryUseCaseResponse{
    library: Library
}

export class CreateLibraryUseCase{
    
    constructor(
        private libraryRepository: LibraryRepository,
        private accountRepository: AccountsRepository
    ){}

    async execute({libraryId, name, image, email, password, cnpj, description }: CreateLibraryUseCaseRequest ): Promise<CreateLibraryUseCaseResponse> {

        const libraryExist = await this.accountRepository.findByEmail(email)
        const cnpjExist = await this.libraryRepository.findByCnpj(cnpj)
        
        if(libraryExist || cnpjExist){
            throw new LibraryAlreadyExistsError()
        }
        
        const password_hast = await hash(password, 6)
        
        const accountLibrary = await this.accountRepository.createAccount({
            email,
            password: password_hast,
            type: 'LIBRARY'
        })

        const id = libraryId
        
        const library = await this.libraryRepository.createLibrary({
            id,
            name,
            image,
            cnpj,
            description,
            account: {
                connect: {id: accountLibrary.id}
            }
        })
        
        return{
            library
        } 
    }
}