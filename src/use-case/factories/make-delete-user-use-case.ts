import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { DeleteUserUseCase } from "../deleteUser";

export function makeDeleteUserUseCase(){

    const userRepository = new PrismaUsersRespository()
    const accountRepository = new PrismaAccountsRepository()

    const deleteUserUseCase = new DeleteUserUseCase(userRepository, accountRepository)

    return deleteUserUseCase
}