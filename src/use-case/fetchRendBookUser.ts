import { RentedBookRepository } from "../repositories/rented-books-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"
import { LibraryRepository } from "../repositories/libraries-repositories"
import { BooksRepository } from "../repositories/books-repositories"
import { AccountsRepository } from "../repositories/accounts-repositories"
import { PhoneLibraryRepository } from "../repositories/phone-library-repositories"
import { AddressLibraryRepository } from "../repositories/address-library-repositories"
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories"

interface FetchRendBookUserUseCaseRequest{
    userId: string
}

interface FetchRendBookUserUseCaseResponse{
     rendBookWithLibrary: {
        id: number
        name: string | undefined
        avatar: string | null | undefined
        email: string | undefined
        ddd: string | undefined
        phone: string | undefined
        street: string | undefined
        neighborhood: string | undefined
        number: string | undefined
        bookId: string | undefined
        image: string | null | undefined
        title: string | undefined
        author: string | undefined
        stars: {
            id: number;
            created_at: Date;
            star: number;
            book_id: string;
            user_id: string;
        }[]
        isAccept: string | undefined
        isComplete: string | undefined
        userVisibility: string
        orderDate: Date | null
        deliveryDate: Date | null
        returnDate: Date | null
        endDate: Date | null
        date: Date | undefined
    }[]
}

export class FetchRendBookUserUseCase{

    constructor(
        private userRepository: UserRepository,
        private libraryRepository: LibraryRepository,
        private bookRepository: BooksRepository,
        private phoneLibraryRepository: PhoneLibraryRepository,
        private addressLibraryRepository: AddressLibraryRepository,
        private accountRepository: AccountsRepository,
        private bookAssessmentRepository: BookAssessmentRepository,
        private rendBookRepository: RentedBookRepository
    ){}

    async execute({ userId }: FetchRendBookUserUseCaseRequest ): Promise<FetchRendBookUserUseCaseResponse> {
        
        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const rendBook = await this.rendBookRepository.fetchRendBookUser(userId)

        const rendBookWithLibrary = await Promise.all(rendBook.map(async book => {
            const library = await this.libraryRepository.findById(book.library_id)

            const account = await this.accountRepository.getAccountId(library?.accountId!)

            const phone = await this.phoneLibraryRepository.getPhone(library?.id!)
            
            const address = await this.addressLibraryRepository.getAddress(library?.id!)

            const rendBook = await this.bookRepository.getBookById(book.book_id)

            const stars = await this.bookAssessmentRepository.getAssessment(rendBook?.id!)

            return{
                id: book.id,
                name: library?.name,
                avatar: library?.image,
                email: account?.email,
                ddd: phone?.ddd,
                phone: phone?.phone,
                street: address?.street,
                neighborhood: address?.neighborhood,
                number: address?.number,
                bookId: rendBook?.id,
                image: rendBook?.image,
                title: rendBook?.title,
                author: rendBook?.author,
                stars,
                isAccept: book.is_accepted,
                isComplete: book.is_complete,
                userVisibility: book.user_visibility,
                orderDate: book.order_date,
                deliveryDate: book.delivery_date,
                returnDate: book.return_date,
                endDate: book.end_date,
                date: rendBook?.created_at
            }
        }))

        return{
            rendBookWithLibrary
        }
    }
}