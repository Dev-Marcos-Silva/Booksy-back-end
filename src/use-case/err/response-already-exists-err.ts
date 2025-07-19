export class ResponseAlreadyExist extends Error{
    constructor(){
        super('Response already exist.')
    }
}