import { Prisma } from "@prisma/client";
import { RentedBookRepository } from "../rented-books-repositories";
import { prisma } from "../../lib";

export class PrismaRentedBooksRepository implements RentedBookRepository {

    async createRendBook(data: Prisma.RentBookCreateInput) {

        const rentedBook = await prisma.rentBook.create({data})

        return rentedBook
    }

    async findRendBookId(rentBookId: number) {

        const rentedBook = await prisma.rentBook.findUnique({
            where: {
                id: rentBookId
            }
        })

        return rentedBook
    }

    async fetchRendBookUser(userId: string) {

        const rentedBook = await prisma.rentBook.findMany({
            where: {
                user_id: userId
            }
        })

        return rentedBook
    }

    async fetchRendBookHistory(userId: string) {

        const rentedBook = await prisma.rentBook.findMany({
            where: {
                user_id: userId,
                AND: {
                    is_complete: 'true',
                    user_visibility: 'true'
                }
            }
        })

        return rentedBook    
    }

    async fetchRendBookLibrary(libraryId: string) {

        const rentedBook = await prisma.rentBook.findMany({
            where: {
                library_id: libraryId
            }
        })

        return rentedBook
    }

    async deleteRendBookUser(rentBookId: number, userId: string, visibility: 'true' | 'false') {

        const rentedBook = await prisma.rentBook.update({
            where: {
                id: rentBookId,
                AND: {
                    user_id: userId,
                },
            },
            data: {
                user_visibility: visibility
            }
        })

        return rentedBook
    }

    async deleteRendBookLibrary(rentBookId: number): Promise<void> {
        
        await prisma.rentBook.delete({
            where: {
                id: rentBookId
            }
        })
    }

    async updateOrderAccepted(rentBookId: number, is_accepted: 'true' | 'false' ) { 
        
        await prisma.rentBook.update({
            where: {
                id: rentBookId
            },
            data:{
                is_accepted: is_accepted
            }
        })
    }

    async updateOrderDeliver(rentBookId: number, deliverDate: Date, returnData: Date) {

        
        const rentedBook = await prisma.rentBook.update({
            where: {
                id: rentBookId
            },
            data:{
                return_date: returnData,
                delivery_date: deliverDate
            }
        })

        return rentedBook
    }

    async updatrOrderComplete(rentBookId: number, endDate: Date, isComplete: 'true' | 'false') {
        
        const rentedBook = await prisma.rentBook.update({
            where: {
                id: rentBookId
            },
            data:{
                is_complete: isComplete,
                end_date: endDate
            }
        })

        return rentedBook
    }
}