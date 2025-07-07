export type BookWithStar = {
    id: string
    title: string
    author: string
    image: string | null
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
    library_id: string
    created_at: Date
    updated_at: Date
    star: number | null
}