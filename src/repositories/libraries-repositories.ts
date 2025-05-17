import { Library, Prisma } from "@prisma/client";

export interface LibraryRepository {

    createLibrary(data: Prisma.LibraryCreateInput): Promise<Library>

    findByCnpj(cnpj: string): Promise<Library | null>

    findByEmail(email: string): Promise<Library | null>

    findById(libraryId: string): Promise<Library | null>
}