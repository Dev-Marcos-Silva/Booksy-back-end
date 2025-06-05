import { Account, AddressLibrary, Library, PhoneLibrary } from "@prisma/client"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { AddressLibraryRepository } from "../repositories/address-library-repositories"
import { PhoneLibraryRepository } from "../repositories/phone-library-repositories"
import { LibraryRepository } from "../repositories/libraries-repositories"

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

        const library = await this.libraryRepository.findByLibraryId(libraryId)

        const account = await this.accountsRepository.getAccountId(library.accountId)

        const address = await this.addressRepository.getAddress(libraryId)

        const phone = await this.phoneRepository.getPhone(libraryId)

        return{
            library,
            account,
            address,
            phone
        }
    }
}