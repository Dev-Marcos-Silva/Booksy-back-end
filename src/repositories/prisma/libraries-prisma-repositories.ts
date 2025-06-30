import { Prisma } from "@prisma/client";
import { LibraryRepository } from "../libraries-repositories";
import { prisma } from "../../lib";

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

    async updateData(libraryId: string, name: string){
        
        const library = await prisma.library.update({
            where:{
                id: libraryId
            },
            data: {
                name: name
            }
        })

        return library
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