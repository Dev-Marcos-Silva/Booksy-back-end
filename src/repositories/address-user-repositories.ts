import { AddressUser, Prisma } from "@prisma/client";

export interface AddressUserRepository {

    createAddress(data: Prisma.AddressUserCreateInput ): Promise<AddressUser>

    getAddress(userId: string): Promise<AddressUser | null>
    
}