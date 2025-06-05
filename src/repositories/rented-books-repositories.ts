import { RentBook, Prisma } from "@prisma/client";

export interface RentedBookRepository{

    createRendBook(data: Prisma.RentBookCreateInput): Promise<RentBook>

    fetchRendBookUser(userId: string): Promise<RentBook[]>

    fetchRendBookLibrary(libraryId: string): Promise<RentBook[]>

    fetchRendBookHistory(userId: string): Promise<RentBook[]>

    findRendBookId(rentBookId: number): Promise<RentBook>

    updateOrderAccepted(rentBookId: number, isAccepted: string): Promise<RentBook>

    updateOrderDeliver(rentBookId: number, dataDeliver: string, days: number): Promise<RentBook>

    updatrOrderComplete(rentBookId: number, isComplete: string, dataComplete: string): Promise<RentBook>

    deleteRendBookUser(userId: string, bookId: number, userVisibility: string): Promise<RentBook[]>

}