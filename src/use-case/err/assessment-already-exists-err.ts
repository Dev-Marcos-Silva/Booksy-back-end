export class AssessmentAlreadyExist extends Error{
    constructor(){
        super('Assessment already exist.')
    }
}