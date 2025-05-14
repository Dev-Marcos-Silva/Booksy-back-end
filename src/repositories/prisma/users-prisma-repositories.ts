import { Prisma} from "@prisma/client";
import { UserRepository } from "../users-repositories.js";
import { prisma } from "../../lib/index.js";

export class PrismaUsersRespository implements UserRepository {

    async createUser(data: Prisma.UserCreateInput){

        const user = await prisma.user.create({
            data,
        })

        return user
    }

    async findByEmail(email: string){

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        return user  
    }
}
