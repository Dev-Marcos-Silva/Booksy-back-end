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
import { uploadImage } from "../../../config/upload-image"
import { updateImage } from "../../../config/update-image"
import { deleteImage } from "../../../config/delete-image"

export function routersBooks(app: FastifyInstance){

    app.post('/register/book/:id',{onRequest: [jwtVerify, verifyAccountRole], preValidation: uploadImage('book')}, register)

    app.get('/book/:id',{onRequest: [jwtVerify]}, book)

    app.get('/search/book',{onRequest: [jwtVerify]}, search)

    app.get('/category/book',{onRequest: [jwtVerify]}, category)

    app.get('/rateds/book',{onRequest: [jwtVerify]}, rateds)

    app.get('/recents/book',{onRequest: [jwtVerify]}, recent)

    app.get('/library/book/:id',{onRequest: [jwtVerify, verifyAccountRole]}, library)

    app.patch('/update/book/:id',{onRequest: [jwtVerify, verifyAccountRole]}, update)

    app.patch('/image/book/:id',{onRequest: [jwtVerify, verifyAccountRole], preValidation: updateImage('book')}, image)

    app.delete('/delete/book/:id',{onRequest:[jwtVerify, verifyAccountRole], preValidation: deleteImage('book')}, deleteBook)

}