import { PrismaUsersAddressRepository } from "../../repositories/prisma/users-address-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { RegisterAddressUserUseCase } from "../registerAddressUser"

export function makeRegisterAddressUserUseCase(){

    const addressUserRepository = new PrismaUsersAddressRepository()
    const userRepository = new PrismaUsersRespository()

    const registerAddressUserUseCase = new RegisterAddressUserUseCase(addressUserRepository, userRepository)

    return registerAddressUserUseCase
}