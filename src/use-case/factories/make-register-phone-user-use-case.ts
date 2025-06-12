import { PrismaUsersPhoneRepository } from "../../repositories/prisma/users-phone-prisma-repositories"
import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories"
import { RegisterPhoneUserUseCase } from "../registerPhoneUser"

export function makeRegisterPhoneUserUseCase(){

    const phoneUserRepository = new PrismaUsersPhoneRepository()
    const userRepository = new PrismaUsersRespository()

    const registerPhoneUserUseCase = new RegisterPhoneUserUseCase(phoneUserRepository, userRepository)
    
    return registerPhoneUserUseCase
}