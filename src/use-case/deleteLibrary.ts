import { AccountsRepository } from "../repositories/accounts-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { UserNotFoundError } from "./err/user-not-found-err";

interface DeleteUserUseCaseRequest{
    userId: string
}

export class DeleteUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private accountRepository: AccountsRepository
    ){}

    async execute({userId}: DeleteUserUseCaseRequest){

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        await this.accountRepository.deleteAccount(user.accountId)
    }
}