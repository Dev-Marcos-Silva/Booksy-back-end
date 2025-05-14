import { Prisma} from "@prisma/client";
import { UserRepository } from "../users-repositories";
import { prisma } from "../../lib/index";

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
