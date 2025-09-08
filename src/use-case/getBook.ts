import { Book } from "@prisma/client";
import { BooksRepository } from "../repositories/books-repositories";
import { BookNotFoundError } from "./err/book-not-found-err";
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories";
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories";

interface GetBooksUseCaseRequest{
    accountId: string
    bookId: string
}

interface GetBooksUseCaseResponse{
    id: string
    library_id: string
    author: string
    title: string
    stars: {
        id: number;
        created_at: Date;
        star: number;
        book_id: string;
        user_id: string;
    }[]
    isbn: string
    image: string | null
    description: string
    dimensions: string
    availability: string
    category: string
    edition: string
    year_publi: string
    finishing: string
    page: number
    amount: number
    bookFavorite: boolean
}

export class GetBooksUseCase{

    constructor(
        private booksRepository: BooksRepository,
        private bookAssessmentRepository: BookAssessmentRepository,
        private favoriteBookRepository: FavoriteBookRepository
    ){}

    async execute({accountId, bookId }: GetBooksUseCaseRequest ): Promise<GetBooksUseCaseResponse> {

        const book = await this.booksRepository.getBookById(bookId)

        if(!book){
            throw new BookNotFoundError()
        }

        const stars = await this.bookAssessmentRepository.getAssessment(bookId)

        const favorite = await this.favoriteBookRepository.getFavoriteBook(accountId, book.id)

        const bookFavorite = favorite? true: false

        return{
            id: book.id,
            library_id: book.library_id,
            author: book.author,
            title: book.title,
            stars,
            isbn: book.isbn,
            image: book.image,
            description: book.description,
            availability: book.availability,
            category: book.category,
            edition: book.edition,
            dimensions: book.dimensions,
            year_publi: book.year_publi,
            finishing: book.finishing,
            amount: book.amount,
            page: book.page,
            bookFavorite: bookFavorite   
        }
    }
}