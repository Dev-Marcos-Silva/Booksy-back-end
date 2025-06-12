import { Prisma } from "@prisma/client";
import { LibraryResponseRepository } from "../library-response-repositories";
import { prisma } from "../../lib";

export class PrismaLibrarisResponseRepository implements LibraryResponseRepository{

    async register(data: Prisma.ResponseCreateInput) {

        const response = await prisma.response.create({data})

        return response
    }
}