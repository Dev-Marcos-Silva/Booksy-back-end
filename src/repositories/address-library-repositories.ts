import { AddressLibrary, Prisma } from "@prisma/client";
import { Address } from "../@types/address-type";

export interface AddressLibraryRepository {

    createAddress(data: Prisma.AddressLibraryCreateInput ): Promise<AddressLibrary>
    
    getAddress(libraryId: string): Promise<AddressLibrary | null>

    updateAddress(newAddress: Address): Promise<void>
    
}