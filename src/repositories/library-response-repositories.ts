import { Prisma, Response } from "@prisma/client";

export interface LibraryResponseRepository{

    register(data: Prisma.ResponseCreateInput): Promise<Response>

    getResponse(commentId: number): Promise<Response | null>
    
}