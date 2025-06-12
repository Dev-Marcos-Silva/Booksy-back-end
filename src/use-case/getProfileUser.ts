import { Account, AddressUser, PhoneUser, User } from "@prisma/client"
import { UserRepository } from "../repositories/users-repositories"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { AddressUserRepository } from "../repositories/address-user-repositories"
import { PhoneUserRepository } from "../repositories/phone-user-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"
import { AccountNotFoundError } from "./err/account-not-found-err"

interface GetProfileUserUseCaseRequest{
    userId: string
}

interface GetProfileUserUseCaseResponse{
    user: User
    account: Account
    address: AddressUser | null
    phone: PhoneUser | null
}

export class GetProfileUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private accountsRepository: AccountsRepository,
        private addressRepository: AddressUserRepository,
        private phoneRepository: PhoneUserRepository
    ){}

    async execute({ userId }: GetProfileUserUseCaseRequest): Promise<GetProfileUserUseCaseResponse>{

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const account = await this.accountsRepository.getAccountId(user.accountId)

        if(!account){
            throw new AccountNotFoundError()
        }

        const address = await this.addressRepository.getAddress(userId)

        const phone = await this.phoneRepository.getPhone(userId)

        return{
            user,
            account,
            address,
            phone
        }
    }
}