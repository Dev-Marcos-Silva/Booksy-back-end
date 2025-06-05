import { User } from "@prisma/client"
import { UserRepository } from "../repositories/users-repositories"

interface UpdateAvatarUserUseCaseRequest{
    userId: string
    avatar: string | null
}

interface UpdateAvatarUserUseCaseResponse{
    user: User
}

export class UpdateAvatarUserUseCase{

    constructor(private userRepository: UserRepository){}

    async execute({ userId, avatar }: UpdateAvatarUserUseCaseRequest ): Promise<UpdateAvatarUserUseCaseResponse> {

        const user = await this.userRepository.updateAvatar(
            userId,
            avatar
        )

        return{
            user
        }
    }
}