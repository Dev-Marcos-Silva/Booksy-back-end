import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaUsersAddressRepository } from "../../repositories/prisma/users-address-prisma-repositories"
import { PrismaUsersPhoneRepository } from "../../repositories/prisma/users-phone-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { GetProfileUserUseCase } from "../getProfileUser"

export function makeGetProfileUserUseCase(){

    const userRepository = new PrismaUsersRespository
    const accountsRepository = new PrismaAccountsRepository
    const addressRepository = new PrismaUsersAddressRepository
    const phoneRepository = new PrismaUsersPhoneRepository

    const getProfileUserUseCase = new GetProfileUserUseCase(userRepository, accountsRepository, addressRepository, phoneRepository)

    return getProfileUserUseCase
}