import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { LibraryRepository } from "../repositories/libraries-repositories"
import { LibraryNotFoundError } from "./err/library-not-found-err"
import { UserRepository } from "../repositories/users-repositories"
import { BooksRepository } from "../repositories/books-repositories"
import { PhoneUserRepository } from "../repositories/phone-user-repositories"
import { AddressUserRepository } from "../repositories/address-user-repositories"
import { AccountsRepository } from "../repositories/accounts-repositories"

interface FetchRendBookLibraryUseCaseRequest{
    libraryId: string
}

interface FetchRendBookLibraryUseCaseResponse{
    rendBookWithUser: {
        id: number
        name: string | undefined
        avatar: string | null | undefined
        email: string | undefined
        ddd: string | undefined
        phone: string | undefined
        city: string | undefined
        street: string | undefined
        neighborhood: string | undefined
        number: string | undefined
        image: string | null | undefined
        title: string | undefined
        author: string | undefined
        edition: string | undefined
        category: string | undefined
        date: Date | undefined
    }[]
}

export class FetchRendBookLibraryUseCase{

    constructor(
        private libraryRepository: LibraryRepository,
        private userRepository: UserRepository,
        private bookRepository: BooksRepository,
        private phoneUserRepository: PhoneUserRepository,
        private addressUserRepository: AddressUserRepository,
        private accountRepository: AccountsRepository,
        private rendBookRepository: RentedBookRepository 
    ){}

    async execute({ libraryId }: FetchRendBookLibraryUseCaseRequest ): Promise<FetchRendBookLibraryUseCaseResponse> {

        const library = await this.libraryRepository.findById(libraryId)

        if(!library){
            throw new LibraryNotFoundError()
        }

        const rendBook = await this.rendBookRepository.fetchRendBookLibrary(libraryId)

        const rendBookWithUser = await Promise.all(rendBook.map(async book => {
            const user = await this.userRepository.findById(book.user_id)

            const account = await this.accountRepository.getAccountId(user?.accountId!)

            const phone = await this.phoneUserRepository.getPhone(user?.id!)
            
            const address = await this.addressUserRepository.getAddress(user?.id!)

            const rendBook = await this.bookRepository.getBookById(book.book_id)

            return{
                id: book.id,
                name: user?.name,
                avatar: user?.avatar,
                email: account?.email,
                ddd: phone?.ddd,
                phone: phone?.phone,
                city: address?.city,
                street: address?.street,
                neighborhood: address?.neighborhood,
                number: address?.number,
                image: rendBook?.image,
                title: rendBook?.title,
                author: rendBook?.author,
                edition: rendBook?.edition,
                category: rendBook?.category,
                date: rendBook?.created_at
            }
        }))

        return{
            rendBookWithUser
        }
    }
}