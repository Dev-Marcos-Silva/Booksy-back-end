import { FavoriteBookRepository } from "../repositories/favorite-book-repositories"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"
import { BooksRepository } from "../repositories/books-repositories"
import { BookAssessmentRepository } from "../repositories/books-assessment-repositories"

interface FetchFavoriteBookUseCaseRequest{
    userId: string
}

interface FetchFavoriteBookUseCaseResponse{
    favoriteBook: {
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

export class FetchFavoriteBookUseCase{

    constructor(
        private userRepository: UserRepository,
        private favoriteBookRepository: FavoriteBookRepository,
        private booksRepository: BooksRepository,
        private bookAssessmentRepository: BookAssessmentRepository
    ){}

    async execute({userId} : FetchFavoriteBookUseCaseRequest): Promise<FetchFavoriteBookUseCaseResponse>{

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const favoriteBookList = await this.favoriteBookRepository.fetchFavoriteBook(userId)

        const favoriteBook = await Promise.all(favoriteBookList.map(async favorite => {

            const book = await this.booksRepository.getBookById(favorite.book_id)

            const star = await this.bookAssessmentRepository.getAssessment(favorite.book_id)

            return{
                id: book?.id!, 
                title: book?.title!,
                author: book?.author!,
                image: book?.image!,
                stars: star,
                bookFavorite: true
            }

        }))

        return{
            favoriteBook
        }
    }
}