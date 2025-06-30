import { InvalidCredentialsError } from "./err/invalid-credetials-err"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { LibraryRepository } from "../repositories/libraries-repositories"
import { compare } from "bcryptjs"
import { Account, Library, User } from "@prisma/client"

interface AuthenticaionUseCaseRequest {
    email: string
    password: string
}

interface AuthenticaionUseCaseResponse {
   account: Account
   user: User | null
   library: Library | null
}

export class AuthenticaionUseCase{
    
    constructor(
        private accountRepository: AccountsRepository,
        private userRepository: UserRepository,
        private libraryRepository: LibraryRepository
    ){}

    async execute ({email, password }: AuthenticaionUseCaseRequest ): Promise<AuthenticaionUseCaseResponse> {

        const account = await this.accountRepository.findByEmail(email)

        if(!account){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        const user = await this.userRepository.findByAccouny(account.id)

        const library = await this.libraryRepository.findByAccouny(account.id)


        return{
            account,
            user,
            library
        }
    }
}