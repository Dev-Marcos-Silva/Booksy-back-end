import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaUsersAddressRepository } from "../../repositories/prisma/users-address-prisma-repositories"
import { PrismaUsersPhoneRepository } from "../../repositories/prisma/users-phone-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { UpdateProfileUserUseCase } from "../updateProfileUser"

export function makeUpdateProfileUserUseCase(){

    const userRepository = new PrismaUsersRespository()
    const accountsRepository = new PrismaAccountsRepository()
    const addressUserRepository = new PrismaUsersAddressRepository()
    const phoneUserRepository = new PrismaUsersPhoneRepository()

    const updateProfileUserUseCase = new UpdateProfileUserUseCase(userRepository, accountsRepository, addressUserRepository, phoneUserRepository)

    return updateProfileUserUseCase
}