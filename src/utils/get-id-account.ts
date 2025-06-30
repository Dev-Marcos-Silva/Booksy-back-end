import { Library, User } from "@prisma/client";

export function getIdAccount(user: User | null , library: Library | null){

    if(user){
        return user.id
    }
    else if(library){
        return library.id
    }
}