import { AddressLibrary } from "@prisma/client";
import { AddressLibraryRepository } from "../repositories/address-library-repositories";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryNotFoundError } from "./err/library-not-found-err";

interface RegisterAddressLibraryUseCaseRequest{
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    libraryId: string;
}

interface RegisterAddressLibraryUseCaseResponse{
    libraryAddress : AddressLibrary
}

export class RegisterAddressLibraryUseCase{

    constructor(
        private addressLibraryRepository: AddressLibraryRepository,
        private libraryRepository: LibraryRepository    
    ){}

    async execute({city, neighborhood, street, number, libraryId  }: RegisterAddressLibraryUseCaseRequest ): Promise<RegisterAddressLibraryUseCaseResponse> {

        const libraryExists = await this.libraryRepository.findById(libraryId)

        if(!libraryExists){
            throw new LibraryNotFoundError()
        }

        const libraryAddress = await this.addressLibraryRepository.createAddress({
            city,
            neighborhood,
            street,
            number,
            library:{
                connect:{ id: libraryId }
            }
        })

        return{
            libraryAddress
        }
    }
}