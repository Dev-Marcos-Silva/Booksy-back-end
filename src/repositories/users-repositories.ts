import { Prisma, User } from "@prisma/client";
import { NewUser } from "../@types/user-type";


export interface UserRepository {

    createUser(data: Prisma.UserCreateInput): Promise<User> 
    
    findById(userId: string): Promise<User | null>

    updateAvatar(userId: string, avatar: string | null): Promise<User>

    updateData(newUser: NewUser): Promise<User>

    findByAccouny(accountId: string): Promise<User | null>
 
}