export class RegisterAddressOrPhoneError extends Error{
    constructor(){
        super('It is necessary to register the users address and telephone number.')
    }
}