import { Prisma, User } from "@prisma/client";

export interface UserRepository {

    createUser(data: Prisma.UserCreateInput): Promise<User> 
    
    findById(userId: string): Promise<User | null>
    
}