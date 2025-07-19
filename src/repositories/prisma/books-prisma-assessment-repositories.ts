import { Assessment, Prisma } from "@prisma/client";
import { BookAssessmentRepository } from "../books-assessment-repositories";
import { prisma } from "../../lib";

export class PrismaBooksAssessmentRepository implements BookAssessmentRepository {

    async register(data: Prisma.AssessmentCreateInput) {

        const assessment = await prisma.assessment.create({data})

        return assessment
    }

    async getAssessment(bookId: string) {

        const assessments = await prisma.assessment.findMany({
            where: {
                book_id: bookId
            }
        })

        return assessments
    }

    async getUserAssessment(bookId: string, userId: string) {

        const assessment = await prisma.assessment.findFirst({
            where: {
                book_id: bookId,
                user_id: userId
            }
        })

        return assessment
        
    }
}