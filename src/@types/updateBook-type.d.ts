import { Availability } from "@prisma/client";

export type UpdateBook = {
    bookId: string
    title: string
    author: string
    description: string
    category: string
    edition: string
    finishing: string
    year_publi: string
    availability: Availability
    isbn: string
    dimensions: string
    page: number
    amount: number
    updated_at: string
}