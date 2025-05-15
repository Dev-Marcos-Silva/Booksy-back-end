import { InvalidCredentialsError } from "./err/invalid-credetials-err"
import { UserRepository } from "../repositories/users-repositories"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"

interface AuthenticaionUseCaseRequest {
    email: string
    password: string
}

interface AuthenticaionUseCaseResponse {
    user: User
}

export class AuthenticaionUseCase{
    
    constructor(private userRepository: UserRepository){}

    async execute ({email, password }: AuthenticaionUseCaseRequest ): Promise<AuthenticaionUseCaseResponse> {

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = compare(password, user.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return{
            user
        }
    }
}