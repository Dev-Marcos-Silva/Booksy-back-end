import { Prisma } from "@prisma/client";
import { PhoneLibraryRepository } from "../phone-library-repositories";
import { prisma } from "../../lib";
import { Phone } from "../../@types/phone-type";

export class PrismaLibrariesPhoneRepository implements PhoneLibraryRepository {

    async creataPhone(data: Prisma.PhoneLibraryCreateInput) {

        const libraryPhone = await prisma.phoneLibrary.create({data})
        
        return libraryPhone  
    }

    async getPhone(libraryId: string) {

        const libraryPhone = await prisma.phoneLibrary.findUnique({
            where: {
                library_id: libraryId
            }
        })

        return libraryPhone
    }

    async updatePhone(newPhone: Phone) {
    
        const {id, phone} = newPhone
    
        await prisma.phoneLibrary.update({
            where: {
                library_id: id
            },data:{
                phone
            }
        })
            
    }
}