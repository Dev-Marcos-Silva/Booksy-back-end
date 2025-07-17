import { Prisma, User } from "@prisma/client";
import { Account } from "../@types/account-type";


export interface UserRepository {

    createUser(data: Prisma.UserCreateInput): Promise<User> 
    
    findById(userId: string): Promise<User | null>

    updateAvatar(userId: string, avatar: string | null): Promise<User>

    updateData(newUser: Account): Promise<User>

    findByAccouny(accountId: string): Promise<User | null>
 
}