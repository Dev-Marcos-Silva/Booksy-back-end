import { Prisma } from "@prisma/client";
import { AddressLibraryRepository } from "../address-library-repositories";
import { prisma } from "../../lib";
import { Address } from "../../@types/address-type";

export class PrismaLibrariesAddressRepository implements AddressLibraryRepository {

    async createAddress(data: Prisma.AddressLibraryCreateInput) {

        const libraryAddress = await prisma.addressLibrary.create({data})

        return libraryAddress
    }

    async getAddress(libraryId: string) {

        const libraryAddress = await prisma.addressLibrary.findUnique({
            where: {
                library_id: libraryId
            }
        })

        return libraryAddress
    }

    async updateAddress(newAddress: Address){
    
        const {id, city, cep, neighborhood, number, street} = newAddress
    
        await prisma.addressLibrary.update({
            where: {
                library_id: id
            },data:{
                city,
                cep,
                neighborhood,
                number,
                street
            }
        })
    
    }
}