import { PhoneLibrary, Prisma } from "@prisma/client";
import { Phone } from "../@types/phone-type";

export interface PhoneLibraryRepository {

    creataPhone(data: Prisma.PhoneLibraryCreateInput): Promise<PhoneLibrary>

    getPhone(libraryId: string): Promise<PhoneLibrary | null>

    updatePhone(newPhone: Phone): Promise<void>
    
}