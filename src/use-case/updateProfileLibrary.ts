import { Account, Library } from "@prisma/client";
import { AccountsRepository } from "../repositories/accounts-repositories";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryAlreadyExistsError } from "./err/library-already-exists-err";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./err/invalid-credetials-err";
import { LibraryNotFoundError } from "./err/library-not-found-err";
import { AccountNotFoundError } from "./err/account-not-found-err";

interface UpdateProfileLibraryUseCaseRequest{
    libraryId: string
    name: string
    email: string
    newPassword: string
    oldPassword: string
}

interface UpdateProfileLibraryUseCaseResponse{
    newLibrary: Library
    newAccount: Account
}

export class UpdateProfileLibraryUseCase{

    constructor(
        private libraryRepository: LibraryRepository,
        private accountsRepository: AccountsRepository
    ){}

    async execute({ libraryId, name, email, newPassword, oldPassword }: UpdateProfileLibraryUseCaseRequest ): Promise<UpdateProfileLibraryUseCaseResponse>{

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const account = await this.accountsRepository.getAccountId(library.accountId)

        if(!account){
            throw new AccountNotFoundError()
        }

        const libraryExist = await this.accountsRepository.findByEmail(email)

        if(libraryExist && libraryExist.email !== account.email){
            throw new LibraryAlreadyExistsError()
        }

        const doesPasswordMatches = await compare(oldPassword, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        const newPasswordHash = await hash(newPassword, 6)

        const newAccount = await this.accountsRepository.updateData(library.accountId, email, newPasswordHash)

        const newLibrary = await this.libraryRepository.updateData(libraryId, name)

        return{
            newLibrary,
            newAccount
        }
    }
}