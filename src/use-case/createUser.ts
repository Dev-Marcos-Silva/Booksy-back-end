import { User } from "@prisma/client";
import { UserRepository } from "../repositories/users-repositories.js";
import { UserAlreadyExistsError } from "./err/user-already-exists-err.js";
import { hash } from "bcryptjs";

interface CreateUserUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface CreateUserUseCaseResponse {
    user: User  
}

export class CreateUserUseCase {

    constructor(private userRepository: UserRepository ){}

    async execute ({name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const password_hash = await hash(password, 6)

        const user = await this.userRepository.createUser({
            name, 
            email, 
            password: password_hash
        })

        return{
            user
        }
    }
}