import { Prisma } from "@prisma/client";
import { AddressUserRepository } from "../address-user-repositories";
import { prisma } from "../../lib";
import { Address } from "../../@types/address-type";

export class PrismaUsersAddressRepository implements AddressUserRepository {

    async createAddress(data: Prisma.AddressUserCreateInput) {

        const userAddress = await prisma.addressUser.create({data})

        return userAddress
    }

    async getAddress(userId: string) {

        const userAddress = await prisma.addressUser.findUnique({
            where: {
                user_id: userId
            }
        })

        return userAddress
    }

    async updateAddress(newAddress: Address){

        const {id, city, neighborhood, number, street} = newAddress

        await prisma.addressUser.update({
            where: {
                user_id: id
            },data:{
                city,
                neighborhood,
                number,
                street
            }
        })

    }
}