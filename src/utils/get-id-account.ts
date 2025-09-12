import { Library, User } from "@prisma/client";

export async function getIdAccount(user: User | null , library: Library | null) {

    if(user || library){
        return{
            id: user?.id ?? library?.id,
        }
    }
}