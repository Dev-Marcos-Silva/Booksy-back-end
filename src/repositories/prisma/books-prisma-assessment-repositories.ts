import { Prisma } from "@prisma/client";
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
}