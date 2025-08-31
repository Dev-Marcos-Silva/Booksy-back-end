import { BooksRepository } from "../repositories/books-repositories";
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories";

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
    }[]
}

export class GetTopRatedBooksUseCase{

    constructor(
        private booksRepository: BooksRepository,
        private bookAssessmentRepository: BookAssessmentRepository
    ){}

    async execute(): Promise<GetTopRatedBooksUseCaseResponse> {

        const books = await this.booksRepository.getBookTopRated()

         const bookWithStar = await Promise.all(books.map(async book => {
            const star = await this.bookAssessmentRepository.getAssessment(book.id)

            return{
                id: book.id,
                title: book.title,
                author: book.author,
                image: book.image,
                stars: star
            }
        }))

        return{
            bookWithStar
        }
    }
}