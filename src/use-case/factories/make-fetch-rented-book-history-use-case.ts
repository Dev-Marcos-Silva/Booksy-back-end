import { PrismaRentedBooksRepository } from "../../repositories/prisma/rented-books-prisma-repositories";
import { FetchRendBookHistoryUseCase } from "../fetchRendBookHistory";

export function makeFetchRentedBookHistoryUseCase(){

    const rendBookRepository = new PrismaRentedBooksRepository()

    const fetchRentedBookHistoryUseCase = new FetchRendBookHistoryUseCase(rendBookRepository)

    return fetchRentedBookHistoryUseCase
}