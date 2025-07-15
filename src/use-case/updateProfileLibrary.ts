import { Account, User } from "@prisma/client";
import { AccountsRepository } from "../repositories/accounts-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { AddressUserRepository } from "../repositories/address-user-repositories";
import { PhoneUserRepository } from "../repositories/phone-user-repositories";
import { UserAlreadyExistsError } from "./err/user-already-exists-err";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./err/invalid-credetials-err";
import { UserNotFoundError } from "./err/user-not-found-err";
import { AccountNotFoundError } from "./err/account-not-found-err";
import { clean, validationEmail, validationPhone } from "../utils/clean-string";

interface UpdateProfileUserUseCaseRequest{
    userId: string
    name: string | undefined 
    email: string | undefined
    newPassword: string | undefined
    oldPassword: string 
    city: string | undefined
    neighborhood: string | undefined
    number: string | undefined
    street: string | undefined
    phone: string | undefined
}

interface UpdateProfileUserUseCaseResponse{
    updateUser: User
    updateAccount: Account
}

export class UpdateProfileUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private accountsRepository: AccountsRepository,
        private addressUserRepository: AddressUserRepository,
        private phoneUserRepository: PhoneUserRepository,
    ){}

    async execute({userId, name, email, newPassword, oldPassword, city, neighborhood, number, street, phone}: UpdateProfileUserUseCaseRequest ): Promise<UpdateProfileUserUseCaseResponse> {

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const account = await this.accountsRepository.getAccountId(user.accountId)

        if(!account){
            throw new AccountNotFoundError()
        }

        const address = await this.addressUserRepository.getAddress(userId)

        if(!address){
            throw new Error('No address')
        }

        const userPhone = await this.phoneUserRepository.getPhone(userId)

        if(!userPhone){
            throw new Error('No phone')
        }

        const doesPasswordMatches = await compare(oldPassword, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        const userExist = await this.accountsRepository.findByEmail(email)

        if(userExist && userExist.email !== account.email){
            throw new UserAlreadyExistsError()
        }

        let password: string | null = null

        const passwordValidation = clean(newPassword)

        if(passwordValidation){
            password = await hash(passwordValidation, 6)
        }

        const newAccount = {
            id: account.id,
            email: validationEmail(email) ?? account.email,
            password: password ?? account.password,
            type: account.type
        }

        const updateAccount = await this.accountsRepository.updateData(newAccount)

        let date = new Date()
        
        const newUser = {
            id: user.id,
            name: clean(name) ?? user.name,
            updated_at: date.toISOString()
        }

        const updateUser = await this.userRepository.updateData(newUser)

        const newAddress = {
            id: user.id,
            city: clean(city) ?? address.city,
            neighborhood: clean(neighborhood) ?? address.neighborhood,
            street: clean(street) ?? address.street,
            number: clean(number) ?? address.number
        }

        await this.addressUserRepository.updateAddress(newAddress)

         const newPhone = {
            id: user.id,
            phone: validationPhone(phone) ?? userPhone.phone
        }

        await this.phoneUserRepository.updatePhone(newPhone)
        
        return {
            updateUser,
            updateAccount
        }
    }
}