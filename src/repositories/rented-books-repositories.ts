import { RentBook, Prisma } from "@prisma/client";

export interface RentedBookRepository{

    createRendBook(data: Prisma.RentBookCreateInput): Promise<RentBook>

}