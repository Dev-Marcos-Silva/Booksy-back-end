import { Library } from "@prisma/client";
import { LibraryAlreadyExistsError } from "./err/library-already-exists-err";
import { UserNotFoundError } from "./err/user-not-found-err";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { AccountsRepository } from "../repositories/accounts-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { hash } from "bcryptjs";
import { makeDeleteUserUseCase } from "./factories/make-delete-user-use-case";

interface CreateLibraryUseCaseRequest{
    libraryId: string
    userId: string
    name: string
    image: string | null
    email: string
    password: string
    cnpj: string
}

interface CreateLibraryUseCaseResponse{
    library: Library
}

export class CreateLibraryUseCase{
    
    constructor(
        private libraryRepository: LibraryRepository,
        private accountRepository: AccountsRepository,
        private userRepository: UserRepository
    ){}

    async execute({libraryId, userId, name, image, email, password, cnpj }: CreateLibraryUseCaseRequest ): Promise<CreateLibraryUseCaseResponse> {
        
        const deleteUserUseCase = makeDeleteUserUseCase()
        const userExist = await this.userRepository.findById(userId)
        const libraryExist = await this.accountRepository.findByEmail(email)
        const cnpjExist = await this.libraryRepository.findByCnpj(cnpj)

        if(!userExist){
            throw new UserNotFoundError()
        }

        const { accountId } = userExist

        const user = await this.accountRepository.getAccountId(accountId)
        
        if(libraryExist && libraryExist.email !== user?.email || cnpjExist){
            throw new LibraryAlreadyExistsError()
        }

        await deleteUserUseCase.execute({userId}) 

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
            account: {
                connect: {id: accountLibrary.id}
            }
        })
        
        return{
            library
        } 

    }
}