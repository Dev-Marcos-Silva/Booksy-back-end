interface CreateUserUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface CreateUserUseCaseResponse {
    
}


export class CreateUserUseCase {

    async execute ({name, email, password }: CreateUserUseCaseRequest ) {

    }
}