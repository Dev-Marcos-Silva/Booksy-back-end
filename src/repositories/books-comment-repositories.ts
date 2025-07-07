import { Comment, Prisma } from "@prisma/client";

export interface BookCommentRepository{
    
    register(data: Prisma.CommentCreateInput): Promise<Comment>

    getComment(bookId: string): Promise<Comment[]>

}