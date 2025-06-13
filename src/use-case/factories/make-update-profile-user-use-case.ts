import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { UpdateProfileUserUseCase } from "../updateProfileUser"

export function makeUpdateProfileUserUseCase(){

    const userRepository = new PrismaUsersRespository()
    const accountsRepository = new PrismaAccountsRepository()

    const updateProfileUserUseCase = new UpdateProfileUserUseCase(userRepository, accountsRepository)

    return updateProfileUserUseCase
}