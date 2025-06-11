import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories";
import { CreateUserUseCase } from "../createUser";

export function makeCreateUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const accountRepository = new PrismaAccountsRepository()

    const createUserUseCase = new CreateUserUseCase(userRepository, accountRepository)

    return createUserUseCase
}