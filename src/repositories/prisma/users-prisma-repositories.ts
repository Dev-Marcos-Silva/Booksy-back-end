import { Prisma } from "@prisma/client";
import { UserRepository } from "../users-repositories";
import { prisma } from "../../lib";

export class PrismaUsersRespository implements UserRepository {

    async createUser(data: Prisma.UserCreateInput){

        const user = await prisma.user.create({data})

        return user
    }

    async findById(userId: string){

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user
    }

    async updateAvatar(userId: string, avatar: string | null){

        const userUpdateAvatar = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                avatar: avatar
            }
        })

        return userUpdateAvatar
    }

    async updateData(userId: string, name: string){

        const userUpdateData = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: name
            }
        })

        return userUpdateData
    }
}