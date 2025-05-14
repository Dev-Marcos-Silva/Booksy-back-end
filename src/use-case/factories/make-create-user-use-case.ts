import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories.js";
import { CreateUserUseCase } from "../createUser.js";

export function makeCreateUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const createUserUseCase = new CreateUserUseCase(userRepository)

    return createUserUseCase
}