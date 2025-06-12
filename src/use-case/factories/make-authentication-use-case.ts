import { PrismaAccountsRepository } from "../../repositories/prisma/accounts-prisma-repositories";
import { AuthenticaionUseCase } from "../authentication";

export function makeAuthenticationUseCase(){

    const accountRepository = new PrismaAccountsRepository()

    const authenticationUseCase = new AuthenticaionUseCase(accountRepository)

    return authenticationUseCase
}