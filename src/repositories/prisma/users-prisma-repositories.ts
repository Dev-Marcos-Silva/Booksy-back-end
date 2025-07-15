import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repositories";
import { prisma } from "../../lib";
import { NewUser } from "../../@types/user-type";

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

        const user = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                avatar: avatar
            }
        })

        return user
    }

    async updateData(newUser: NewUser){

        const {id, name, updated_at} = newUser

        const userUpdateData = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                updated_at
            }
        })

        return userUpdateData
    }

    async findByAccouny(accountId: string){

        const user = await prisma.user.findUnique({
            where: {
                accountId
            }
        })

        return user
    }
}