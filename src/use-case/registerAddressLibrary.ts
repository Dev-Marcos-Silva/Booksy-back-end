import { AddressLibrary } from "@prisma/client";
import { AddressLibraryRepository } from "../repositories/address-library-repositories";
import { libraryRepository } from "../repositories/libraries-repositories";
import { LibraryNotFoundError } from "./err/library-not-found-err";

interface RegisterAddressLibraryUseCaseRequest{
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    library_id: string;
}

interface RegisterAddressLibraryUseCaseResponse{
    libraryAddress : AddressLibrary
}

export class RegisterAddressUserUseCase{

    constructor(
        private addressLibraryRepository: AddressLibraryRepository,
        private libraryRepository: libraryRepository    
    ){}

    async execute({city, neighborhood, street, number, library_id  }: RegisterAddressLibraryUseCaseRequest ): Promise<RegisterAddressLibraryUseCaseResponse> {

        const libraryExists = await this.libraryRepository.findById(library_id)

        if(!libraryExists){
            throw new LibraryNotFoundError()
        }

        const libraryAddress = await this.addressLibraryRepository.createAddress({
            city,
            neighborhood,
            street,
            number,
            library:{
                connect:{ id: library_id }
            }
        })

        return{
            libraryAddress
        }
    }
}