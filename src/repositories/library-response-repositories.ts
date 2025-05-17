import { Prisma } from "@prisma/client";

export interface LibraryResponseRepository{

    register(data: Prisma.ResponseCreateInput): Promise<Response>
}