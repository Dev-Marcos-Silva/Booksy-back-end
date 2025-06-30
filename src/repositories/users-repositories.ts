import { Prisma, User } from "@prisma/client";

export interface UserRepository {

    createUser(data: Prisma.UserCreateInput): Promise<User> 
    
    findById(userId: string): Promise<User | null>

    updateAvatar(userId: string, avatar: string | null): Promise<User>

    updateData(userId: string, name: string): Promise<User>

    findByAccouny(accountId: string): Promise<User | null>
    
}