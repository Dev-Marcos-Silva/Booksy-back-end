import { Assessment, Prisma } from "@prisma/client";

export interface BookAssessmentRepository{

    register(data: Prisma.AssessmentCreateInput): Promise<Assessment>

    getAssessment(bookId: string): Promise<Assessment[]>

    getUserAssessment(bookId: string, userId: string): Promise<Assessment | null>
    
}