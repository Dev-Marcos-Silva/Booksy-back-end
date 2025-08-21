import { AccountsRepository } from "../repositories/accounts-repositories";
import { LibraryRepository } from "../repositories/libraries-repositories";
import { LibraryNotFoundError } from "./err/library-not-found-err";

interface DeleteLibraryUseCaseRequest{
    libraryId: string
}

export class DeleteLibraryUseCase{

    constructor(
        private libraryRepository: LibraryRepository,
        private accountRepository: AccountsRepository
    ){}

    async execute({libraryId}: DeleteLibraryUseCaseRequest){

        const library = await this.libraryRepository.findById(libraryId)

        if(library){
            await this.accountRepository.deleteAccount(library.accountId)
        }
    }
}