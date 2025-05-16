import { PhoneLibrary } from "@prisma/client";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { PhoneLibraryRepository } from "../repositories/phone-library-repositories";
import { LibraryNotFoundError } from "./err/library-not-found-err";

interface RegisterPhoneLibraryUseCaseRequest{
    phone: string
    libraryId: string
}

interface RegisterPhoneLibraryUseCaseReponse{
    phoneLibrary: PhoneLibrary
}

export class RegisterPhoneLibraryUseCase{
    constructor(
        private phoneLibraryRepository: PhoneLibraryRepository,
        private libraryRepository: LibraryRepository
    ){}

    async execute({phone, libraryId}: RegisterPhoneLibraryUseCaseRequest ): Promise<RegisterPhoneLibraryUseCaseReponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const phoneLibrary = await this.phoneLibraryRepository.creataPhone({
            phone,
            library:{
                connect:{id: libraryId}
            }
        })

        return{
            phoneLibrary
        }
    }
}