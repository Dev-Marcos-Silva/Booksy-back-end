import { AddressLibrary, Prisma } from "@prisma/client";

export interface AddressLibraryRepository {

    createAddress(data: Prisma.AddressLibraryCreateInput ): Promise<AddressLibrary>
    
    getAddress(libraryId: string): Promise<AddressLibrary | null>
    
}