import { AddressUser, Prisma } from "@prisma/client";
import { Address } from "../@types/address-type";

export interface AddressUserRepository {

    createAddress(data: Prisma.AddressUserCreateInput ): Promise<AddressUser>

    getAddress(userId: string): Promise<AddressUser | null>

    updateAddress(newAddress: Address): Promise<void>
    
}