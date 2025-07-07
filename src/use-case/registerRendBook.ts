
import { RentBook } from "@prisma/client";
import { RentedBookRepository } from "../repositories/rented-books-repositories";
import { AddressUserRepository } from "../repositories/address-user-repositories";
import { PhoneUserRepository } from "../repositories/phone-user-repositories";
import { RegisterAddressOrPhoneError } from "./err/register-address-or-phone-err";

interface RegisterRendBookUseCaseRequest{
    days: number
    bookId: string
    userId: string
    libraryId: string 
}

interface RegisterRendBookUseCaseResponse{
    rendBook: RentBook
}

export class RegisterRendBookUseCase{

    constructor(
        private rendBookRepository: RentedBookRepository,
        private addressUserRepository: AddressUserRepository,
        private phoneUserRepository: PhoneUserRepository 
    ){}

    async execute({userId, libraryId, bookId, days }: RegisterRendBookUseCaseRequest ): Promise<RegisterRendBookUseCaseResponse> {

        const address = await this.addressUserRepository.getAddress(userId)

        const phone = await this.phoneUserRepository.getPhone(userId)

        if(!address || !phone){
            throw new RegisterAddressOrPhoneError()
        }

        const rendBook = await this.rendBookRepository.createRendBook({
            days,
            book: {
                connect: {id: bookId}
            },
            user: {
                connect: {id: userId}
            },
            library: {
                connect: {id: libraryId}
            }
        })

        return{
            rendBook
        }

    }
}