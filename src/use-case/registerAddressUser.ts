import { AddressUser } from "@prisma/client";
import { AddressUserRepository } from "../repositories/address-user-repositories";
import { UserRepository } from "../repositories/users-repositories";
import { UserNotFoundError } from "./err/user-not-found-err";

interface RegisterAddressUserUseCaseRequest{
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    userId: string;
}

interface RegisterAddressUserUseCaseResponse{
    userAddress : AddressUser
}

export class RegisterAddressUserUseCase{

    constructor(
        private addressUserRepository: AddressUserRepository,
        private userRepository: UserRepository    
    ){}

    async execute({city, neighborhood, street, number, userId  }: RegisterAddressUserUseCaseRequest ): Promise<RegisterAddressUserUseCaseResponse> {

        const userExists = await this.userRepository.findById(userId)

        if(!userExists){
            throw new UserNotFoundError()
        }

        const userAddress = await this.addressUserRepository.createAddress({
            city,
            neighborhood,
            street,
            number,
            user:{
                connect:{ id: userId }
            }
        })

        return{
            userAddress
        }
    }
}