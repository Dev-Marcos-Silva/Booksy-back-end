import { InvalidCredentialsError } from "./err/invalid-credetials-err"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { compare } from "bcryptjs"
import { Account, Library, User } from "@prisma/client"

interface AuthenticaionUseCaseRequest {
    email: string
    password: string
}

interface AuthenticaionUseCaseResponse {
    account: Account & {
        user?: User | null
        library?: Library | null 
    }
}

export class AuthenticaionUseCase{
    
    constructor(private accountRepository: AccountsRepository){}

    async execute ({email, password }: AuthenticaionUseCaseRequest ): Promise<AuthenticaionUseCaseResponse> {

        const account = await this.accountRepository.findByEmail(email)

        if(!account){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return{
            account
        }
    }
}