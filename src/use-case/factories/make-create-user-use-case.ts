import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { CreateUserUseCase } from "../createUser";

export function makeCreateUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const createUserUseCase = new CreateUserUseCase(userRepository)

    return createUserUseCase
}