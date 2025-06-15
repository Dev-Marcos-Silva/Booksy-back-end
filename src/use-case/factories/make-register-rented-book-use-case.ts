import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { PrismaUsersAddressRepository } from "../../repositories/prisma/users-address-prisma-repositories";
import { PrismaUsersPhoneRepository } from "../../repositories/prisma/users-phone-prisma-repositories";
import { RegisterRendBookUseCase } from "../registerRendBook";

export function makeRegisterRentedBookUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()
    const addressUserRepository = new PrismaUsersAddressRepository()
    const phoneUserRepository = new PrismaUsersPhoneRepository()

    const registerRentedBookUseCase = new RegisterRendBookUseCase(rendBookRepository, addressUserRepository, phoneUserRepository)

    return registerRentedBookUseCase
}