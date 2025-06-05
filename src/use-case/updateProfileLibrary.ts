import { Account, Library } from "@prisma/client";
import { AccountsRepository } from "../repositories/accounts-repositories";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryAlreadyExistsError } from "./err/library-already-exists-err";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./err/invalid-credetials-err";

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

        const library = await this.libraryRepository.findByLibraryId(libraryId)

        const account = await this.accountsRepository.getAccountId(library.accountId)

        const libraryExist = await this.accountsRepository.findByEmail(email)

        if(libraryExist){
            throw new LibraryAlreadyExistsError()
        }

        const doesPasswordMatches = await compare(oldPassword, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        const newAccount = await this.accountsRepository.updateData(library.accountId, email, newPassword)

        const newLibrary = await this.libraryRepository.updateData(libraryId, name)

        return{
            newLibrary,
            newAccount
        }
    }
}