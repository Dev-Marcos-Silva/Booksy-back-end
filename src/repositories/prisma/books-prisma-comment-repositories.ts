import { Prisma } from "@prisma/client";
import { BookCommentRepository } from "../books-comment-repositories";
import { prisma } from "../../lib";

export class PrismaBooksCommentRepository implements BookCommentRepository {

    async register(data: Prisma.CommentCreateInput) {

        const comment = await prisma.comment.create({data})

        return comment      
    }

    async getComment(bookId: string) {

        const comments = await prisma.comment.findMany({
            where: {
                book_id: bookId
            }
        })

        return comments
    }
}