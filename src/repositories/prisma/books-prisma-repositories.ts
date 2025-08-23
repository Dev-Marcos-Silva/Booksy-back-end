import { Book, Prisma } from "@prisma/client";
import { BooksRepository } from "../books-repositories";
import { prisma } from "../../lib";
import { UpdateBook } from "../../@types/updateBook-type";

export class PrismaBooksRepository implements BooksRepository {

    async createBook(data: Prisma.BookCreateInput){

        const book = await prisma.book.create({data})

        return book 
    }

    async getBookById(bookId: string){

        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }
        })

        return book
    }

    async getAllBook(libraryId: string){

        const books = await prisma.book.findMany({
            where: {
                library_id: libraryId
            }
        })

        return books 
    }

    async searchByTitleOrAuthor(query: string){

        const books = await prisma.book.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        author: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })

        return books  
    }

    async searchByCategory(category: string){

        const books = await prisma.book.findMany({
            where: {
                category: {
                    contains: category,
                    mode: 'insensitive'
                }
            }
        })

        return books
    }

    async findBookIsbn(isbn: string){

        const book = await prisma.book.findMany({
            where:{
                isbn: isbn
            }
        })

        return book 
    }

    async getBookRecent(){

        const books = await prisma.book.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 10
        })

        return books
    }

    async getBookTopRated(){

        const starWithBookId = await prisma.assessment.groupBy({
            by: ['book_id'],
            _avg: {
                star: true
            },
            orderBy:{
                _avg: {
                    star: 'desc'
                }
            },
            take: 10
        })

        const booksWithStar = await Promise.all(

            starWithBookId.map(async(book) => {

                const bookData = await prisma.book.findUnique({
                    where: {
                        id: book.book_id
                    }
                })

                if(!bookData){
                    throw new Error('error')
                }

                return{
                    ...bookData,
                    star: book._avg.star
                
                }  
            })
        )

        return booksWithStar
    }

    async updateBook(updateBook: UpdateBook){

        const {
            bookId,
            title,
            author,
            description,
            category,
            edition,
            finishing,
            year_publi,
            availability,
            isbn,
            dimensions,
            page,
            amount,
            updated_at
        } = updateBook

        await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                title,
                author,
                description,
                category,
                edition,
                finishing,
                year_publi,
                availability,
                isbn,
                dimensions,
                page,
                amount,
                updated_at
            }
        })
    }

    async updateImage(bookId: string, image: string | null){

        const book = await prisma.book.update({
            where:{
                id: bookId
            },
            data:{
                image: image
            }
        })

        return book
    }

    async deleteBookById(bookId: string){

        await prisma.book.delete({
            where: {
                id: bookId,
            }
        })
    }
}