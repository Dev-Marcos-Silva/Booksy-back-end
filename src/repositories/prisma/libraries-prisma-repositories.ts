import { Prisma } from "@prisma/client";
import { LibraryRepository } from "../libraries-repositories";
import { prisma } from "../../lib";
import { Account } from "../../@types/account-type";

export class PrismaLibrariesRepository implements LibraryRepository {

    async createLibrary(data: Prisma.LibraryCreateInput){

        const library = await prisma.library.create({data})

        return library  
    }

    async findById(libraryId: string){

        const library = await prisma.library.findUnique({
            where: {
                id: libraryId
            }
        })

        return library
    }

    async findByCnpj(cnpj: string){

        const library = await prisma.library.findUnique({
            where: {
                cnpj: cnpj
            }
        })

        return library
    }

    async updateImage(libraryId: string, image: string | null){

        const library = await prisma.library.update({
            where: {
                id: libraryId
            },
            data:{
                image: image
            }
        })

        return library 
    }

    async updateData(newLibrary: Account){

        const {id, name, updated_at} = newLibrary
        
        const libraryUpdate = await prisma.library.update({
            where:{
                id
            },
            data: {
                name,
                updated_at
            }
        })

        return libraryUpdate
    }

    async findByAccouny(accountId: string){

        const library = await prisma.library.findUnique({
            where: {
                accountId
            }
        })

        return library
    }
}