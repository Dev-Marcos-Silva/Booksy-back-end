import { Library, Prisma } from "@prisma/client";

export interface LibraryRepository {

    createLibrary(data: Prisma.LibraryCreateInput): Promise<Library>

    findByCnpj(cnpj: string): Promise<Library | null>

    findById(libraryId: string): Promise<Library | null>

    updateImage(libraryId: string, image: string | null): Promise<Library>
    
    updateData(libraryId: string, name: string): Promise<Library>

    findByAccouny(accountId: string): Promise<Library | null>
    
    
}