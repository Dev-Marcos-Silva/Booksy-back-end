import { BooksRepository } from "../repositories/books-repositories";
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories";
import { FavoriteBookRepository } from "../repositories/favorite-book-repositories";

interface GetTopRatedBooksUseCaseRequest{
    userId: string
}

interface GetTopRatedBooksUseCaseResponse{
    bookWithStar: {
        id: string
        title: string
        author: string
        image: string | null
        stars: {
            id: number;
            created_at: Date;
            star: number;
            book_id: string;
            user_id: string;
        }[]
        bookFavorite: boolean
    }[]
}

export class GetTopRatedBooksUseCase{

    constructor(
        private booksRepository: BooksRepository,
        private bookAssessmentRepository: BookAssessmentRepository,
        private favoriteBookRepository: FavoriteBookRepository
    ){}

    async execute({userId}: GetTopRatedBooksUseCaseRequest): Promise<GetTopRatedBooksUseCaseResponse> {

        const books = await this.booksRepository.getBookTopRated()

         const bookWithStar = await Promise.all(books.map(async book => {
            const star = await this.bookAssessmentRepository.getAssessment(book.id)

            const favorite = await this.favoriteBookRepository.getFavoriteBook(userId, book.id)

            const bookFavorite = favorite? true: false

            return{
                id: book.id,
                title: book.title,
                author: book.author,
                image: book.image,
                stars: star,
                bookFavorite
            }
        }))

        return{
            bookWithStar
        }
    }
}