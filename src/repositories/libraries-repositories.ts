import { Library, Prisma } from "@prisma/client";
import { Account } from "../@types/account-type";

export interface LibraryRepository {

    createLibrary(data: Prisma.LibraryCreateInput): Promise<Library>

    findByCnpj(cnpj: string): Promise<Library | null>

    findById(libraryId: string): Promise<Library | null>

    updateImage(libraryId: string, image: string | null): Promise<Library>
    
    updateData(newLibrary: Account): Promise<Library>

    findByAccouny(accountId: string): Promise<Library | null>
    
    
}