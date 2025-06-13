import { PrismaUsersRespository } from "../../repositories/prisma/users-prisma-repositories";
import { UpdateAvatarUserUseCase } from "../updateAvatarUser";

export function makeUpdateAvatarUserUseCase(){

    const userRepository = new PrismaUsersRespository()

    const updateAvatarUserUseCase = new UpdateAvatarUserUseCase(userRepository)

    return updateAvatarUserUseCase
}