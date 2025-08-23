export class DuplicateBookRecordError extends Error{
    constructor(){
        super('duplicate book record.')
    }
}