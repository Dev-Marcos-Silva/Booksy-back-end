import { PhoneLibrary, Prisma } from "@prisma/client";

export interface PhoneLibraryRepository {

    creataPhone(data: Prisma.PhoneLibraryCreateInput): Promise<PhoneLibrary>

}