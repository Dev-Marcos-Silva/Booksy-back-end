export class LibraryAlreadyExistsError extends Error{
    constructor(){
        super('Cnpj ou Email already exists.')
    }
}