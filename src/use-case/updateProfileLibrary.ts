import { Account, Library } from "@prisma/client";
import { AccountsRepository } from "../repositories/accounts-repositories";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./err/invalid-credetials-err";
import { AccountNotFoundError } from "./err/account-not-found-err";
import { clean, validationEmail, validationPhone } from "../utils/clean-string";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { AddressLibraryRepository } from "../repositories/address-library-repositories";
import { PhoneLibraryRepository } from "../repositories/phone-library-repositories";
import { LibraryNotFoundError } from "./err/library-not-found-err";
import { LibraryAlreadyExistsError } from "./err/library-already-exists-err";

interface UpdateProfileLibraryUseCaseRequest{
    libraryId: string
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

interface UpdateProfileLibraryUseCaseResponse{
    updateLibrary: Library
    updateAccount: Account
}

export class UpdateProfileLibraryUseCase{

    constructor(
        private libraryRepository: LibraryRepository,
        private accountsRepository: AccountsRepository,
        private addressLibraryRepository: AddressLibraryRepository,
        private phoneLibraryRepository: PhoneLibraryRepository,
    ){}

    async execute({libraryId, name, email, newPassword, oldPassword, city, neighborhood, number, street, phone}: UpdateProfileLibraryUseCaseRequest ): Promise<UpdateProfileLibraryUseCaseResponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const account = await this.accountsRepository.getAccountId(library.accountId)

        if(!account){
            throw new AccountNotFoundError()
        }

        const address = await this.addressLibraryRepository.getAddress(libraryId)

        if(!address){
            throw new Error('No address')
        }

        const libraryPhone = await this.phoneLibraryRepository.getPhone(libraryId)

        if(!libraryPhone){
            throw new Error('No phone')
        }

        const doesPasswordMatches = await compare(oldPassword, account.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        const libraryExist = await this.accountsRepository.findByEmail(email)

        if(libraryExist && libraryExist.email !== account.email){
            throw new LibraryAlreadyExistsError()
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
        
        const newLibrary = {
            id: library.id,
            name: clean(name) ?? library.name,
            updated_at: date.toISOString()
        }

        const updateLibrary = await this.libraryRepository.updateData(newLibrary)

        const newAddress = {
            id: library.id,
            city: clean(city) ?? address.city,
            neighborhood: clean(neighborhood) ?? address.neighborhood,
            street: clean(street) ?? address.street,
            number: clean(number) ?? address.number
        }

        await this.addressLibraryRepository.updateAddress(newAddress)

         const newPhone = {
            id: library.id,
            phone: validationPhone(phone) ?? libraryPhone.phone
        }

        await this.phoneLibraryRepository.updatePhone(newPhone)
        
        return {
            updateLibrary,
            updateAccount
        }
    }
}