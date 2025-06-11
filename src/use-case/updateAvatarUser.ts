import { User } from "@prisma/client"
import { UserRepository } from "../repositories/users-repositories"
import { UserNotFoundError } from "./err/user-not-found-err"

interface UpdateAvatarUserUseCaseRequest{
    userId: string
    avatar: string | null
}

interface UpdateAvatarUserUseCaseResponse{
    userUpdate: User
}

export class UpdateAvatarUserUseCase{

    constructor(private userRepository: UserRepository){}

    async execute({ userId, avatar }: UpdateAvatarUserUseCaseRequest ): Promise<UpdateAvatarUserUseCaseResponse> {

        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new UserNotFoundError()
        }

        const userUpdate = await this.userRepository.updateAvatar(
            userId,
            avatar
        )

        return{
            userUpdate
        }
    }
}