import { FastifyInstance } from "fastify"
import { register } from "./register"
import { library } from "./library"
import { update } from "./update"
import { deleteBook } from "./delete"
import { book } from "./book"
import { search } from "./search"
import { category } from "./category"
import { rateds } from "./rateds"
import { recent } from "./recent"
import { image } from "./image"
import { jwtVerify } from "../../middlewares/verify-jwt"
import { verifyAccountRole } from "../../middlewares/verify-account-role"
import { updateImage } from "../../../config/upload-image"

export function routersBooks(app: FastifyInstance){

    app.get('/book',{onRequest: [jwtVerify]}, book)

    app.get('/search/book',{onRequest: [jwtVerify]}, search)

    app.get('/category/book',{onRequest: [jwtVerify]}, category)

    app.get('/rateds/book',{onRequest: [jwtVerify]}, rateds)

    app.get('/recents/book',{onRequest: [jwtVerify]}, recent)

    app.post('/register/book',{onRequest: [jwtVerify, verifyAccountRole], preValidation: updateImage('books')}, register)

    app.get('/library/book',{onRequest: [jwtVerify, verifyAccountRole]}, library)

    app.put('/update/book',{onRequest: [jwtVerify, verifyAccountRole]}, update)

    app.patch('/imagen/book',{onRequest: [jwtVerify, verifyAccountRole]}, image)

    app.delete('/delete/book',{onRequest:[jwtVerify, verifyAccountRole]}, deleteBook)

}