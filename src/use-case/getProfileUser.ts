import { Account, AddressUser, PhoneUser, User } from "@prisma/client"
import { UserRepository } from "../repositories/users-repositories"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { AddressUserRepository } from "../repositories/address-user-repositories"
import { PhoneUserRepository } from "../repositories/phone-user-repositories"

interface GetProfileUserUseCaseRequest{
    userId: string
}

interface GetProfileUserUseCaseResponse{
    user: User
    account: Account
    address: AddressUser
    phone: PhoneUser
}

export class GetProfileUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private accountsRepository: AccountsRepository,
        private addressRepository: AddressUserRepository,
        private phoneRepository: PhoneUserRepository
    ){}

    async execute({ userId }: GetProfileUserUseCaseRequest): Promise<GetProfileUserUseCaseResponse>{

        const user = await this.userRepository.findByUserId(userId)

        const account = await this.accountsRepository.getAccountId(user.accountId)

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