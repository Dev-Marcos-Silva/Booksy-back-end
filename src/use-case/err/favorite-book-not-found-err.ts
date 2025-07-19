export class FavoriteBookNotFound extends Error{
    constructor(){
        super('Favorite book not found.')
    }
}