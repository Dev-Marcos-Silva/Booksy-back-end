import { Library, Prisma } from "@prisma/client";

export interface LibraryRepository {

    createLibrary(data: Prisma.LibraryCreateInput): Promise<Library>

    findByCnpj(cnpj: string): Promise<Library | null>

    findById(libraryId: string): Promise<Library | null>

    findByLibraryId(libraryId: string): Promise<Library>

    updateImage(libraryId: string, image: string | null): Promise<Library>
    
    updateData(libraryId: string, name: string): Promise<Library>
    
}