import { Account, User } from "@prisma/client";
import { AccountsRepository } from "../repositories/accounts-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { UserAlreadyExistsError } from "./err/user-already-exists-err";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./err/invalid-credetials-err";
import { UserNotFoundError } from "./err/user-not-found-err";
import { AccountNotFoundError } from "./err/account-not-found-err";

interface UpdateProfileUserUseCaseRequest{
    userId: string
    name: string
    email: string
    newPassword: string
    oldPassword: string
}

interface UpdateProfileUserUseCaseResponse{
    newUser: User
    newAccount: Account
}

export class UpdateProfileUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private accountsRepository: AccountsRepository
    ){}

    async execute({userId, name, email, newPassword, oldPassword}: UpdateProfileUserUseCaseRequest ): Promise<UpdateProfileUserUseCaseResponse> {

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const account = await this.accountsRepository.getAccountId(user.accountId)

        if(!account){
            throw new AccountNotFoundError()
        }

        const userExist = await this.accountsRepository.findByEmail(email)

        if(userExist && userExist.email !== account.email){
            throw new UserAlreadyExistsError()
        }

        const doesPasswordMatches = await compare(oldPassword, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        const newPasswordHash = await hash(newPassword, 6)

        const newAccount = await this.accountsRepository.updateData(user.accountId, email, newPasswordHash)

        const newUser = await this.userRepository.updateData(userId, name)

        return{
            newUser,
            newAccount
        }
    }
}