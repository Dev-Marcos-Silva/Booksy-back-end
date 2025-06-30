import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories";
import { PrismaLibrariesRepository } from "../../repositories/prisma/libraries-prisma-repositories";
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { AuthenticaionUseCase } from "../authentication";

export function makeAuthenticationUseCase(){

    const accountRepository = new PrismaAccountsRepository()

    const userRepository = new PrismaUsersRespository()

    const libraryRepository = new PrismaLibrariesRepository()

    const authenticationUseCase = new AuthenticaionUseCase(accountRepository, userRepository, libraryRepository)

    return authenticationUseCase
}