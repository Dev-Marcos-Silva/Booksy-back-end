import { RentBook, Prisma } from "@prisma/client";

export interface RentedBookRepository{

    createRendBook(data: Prisma.RentBookCreateInput): Promise<RentBook>

    fetchRendBookUser(userId: string): Promise<RentBook[]>

    fetchRendBookLibrary(libraryId: string): Promise<RentBook[]>

    fetchRendBookHistory(userId: string): Promise<RentBook[]>

    findRendBookId(rentBookId: number): Promise<RentBook | null>

    updateOrderAccepted(rentBookId: number, isAccepted: 'true' | 'false'): Promise<void>

    updateOrderDeliver(rentBookId: number, dataDeliver: Date, returnData: Date): Promise<RentBook>

    updatrOrderComplete(rentBookId: number, isComplete: 'true' | 'false'): Promise<RentBook>

    deleteRendBookUser(rentBookId: number, userId: string, visibility: 'true' | 'false'): Promise<RentBook>

    deleteRendBookLibrary(rentBookId: number): Promise<void>

}