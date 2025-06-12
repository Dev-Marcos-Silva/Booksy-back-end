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
    library: Library
    account: Account
    address: AddressLibrary
    phone: PhoneLibrary
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
            library,
            account,
            address,
            phone
        }
    }
}