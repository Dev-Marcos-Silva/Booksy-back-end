import { Prisma } from "@prisma/client";
import { PhoneUserRepository } from "../phone-user-repositories";
import { prisma } from "../../lib";
import { Phone } from "../../@types/phone-type";

export class PrismaUsersPhoneRepository implements PhoneUserRepository {

    async creataPhone(data: Prisma.PhoneUserCreateInput) {

        const userPhone = await prisma.phoneUser.create({data})

        return userPhone   
    }

    async getPhone(userId: string) {

        const userPhone = await prisma.phoneUser.findUnique({
            where: {
                user_id: userId
            }
        })

        return userPhone
    }

    async updatePhone(newPhone: Phone) {

        const {id, ddd, phone} = newPhone

        await prisma.phoneUser.update({
            where: {
                user_id: id
            },data:{
                ddd,
                phone
            }
        })
        
    }
}