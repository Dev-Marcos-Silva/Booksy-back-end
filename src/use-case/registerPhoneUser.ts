import { PhoneUser } from "@prisma/client";
import { PhoneUserRepository } from "../repositories/phone-user-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { UserNotFoundError } from "./err/user-not-found-err";

interface RegisterPhoneUserUseCaseRequest{
    phone: string
    userId: string
}

interface RegisterPhoneUserUseCaseReponse{
    phoneUser: PhoneUser
}

export class RegisterPhoneUserUseCase{

    constructor(
        private phoneUserRepository: PhoneUserRepository,
        private userRepository: UserRepository
    ){}
    
    async execute({phone, userId }: RegisterPhoneUserUseCaseRequest ): Promise<RegisterPhoneUserUseCaseReponse> {
        
        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const phoneUser = await this.phoneUserRepository.creataPhone({
            phone,
            user: {
                connect:{id: userId}
            }
        })

        return{
            phoneUser
        }
    }
}