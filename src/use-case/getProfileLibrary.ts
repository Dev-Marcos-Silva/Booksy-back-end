import { Account, AddressLibrary, Library, PhoneLibrary } from "@prisma/client"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { AddressLibraryRepository } from "../repositories/address-library-repositories"
import { PhoneLibraryRepository } from "../repositories/phone-library-repositories"
import { LibraryRepository } from "../repositories/libraries-repositories"
import { LibraryNotFoundError } from "./err/library-not-found-err"
import { AccountNotFoundError } from "./err/account-not-found-err"

interface GetProfileLibraryUseCaseRequest{
    libraryId: string
} 

interface GetProfileLibraryUseCaseResponse{
    id: string
    name: string
    image: string | null
    email: string
    cep: string
	city: string
	neighborhood: string
	street: string
	number: string
    ddd: string
	phone: string
}

export class GetProfileLibraryUseCase{
    
    constructor(
        private libraryRepository: LibraryRepository,
        private accountsRepository: AccountsRepository,
        private addressRepository: AddressLibraryRepository,
        private phoneRepository: PhoneLibraryRepository
    ){}

    async execute({ libraryId }: GetProfileLibraryUseCaseRequest): Promise<GetProfileLibraryUseCaseResponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const account = await this.accountsRepository.getAccountId(library.accountId)

        if(!account){
            throw new AccountNotFoundError()
        }

        const address = await this.addressRepository.getAddress(libraryId)

        const phone = await this.phoneRepository.getPhone(libraryId)

        if(!address || !phone){
            throw new LibraryNotFoundError()
        }

        return{
            id: library.id,
            name: library.name,
            image: library.image,
            email: account.email,
            cep: address.cep,
            city: address.city,
            neighborhood: address.neighborhood,
            street: address.street,
            number: address.number,
            ddd: phone.ddd,
            phone: phone.phone

        }
    }
}