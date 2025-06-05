import { UserAlreadyExistsError } from "./err/user-already-exists-err";
import { UserRepository } from "../repositories/users-repositories";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { AccountsRepository } from "../repositories/accounts-repositories";

interface CreateUserUseCaseRequest{
    name: string,
    email: string,
    password: string
}

interface CreateUserUseCaseResponse{
    user: User  
}

export class CreateUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private accountRepository: AccountsRepository
    ){}

    async execute({name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const userExist = await this.accountRepository.findByEmail(email)

        if(userExist){
            throw new UserAlreadyExistsError()
        }

        const password_hast = await hash(password, 6)

        const accountUser = await this.accountRepository.createAccount({
            email,
            password: password_hast,
            type: "user"
        })

        const user = await this.userRepository.createUser({
            name,
            account:{
                connect: {id: accountUser.id }
            }
        })

        return{
            user
        } 
    }
}