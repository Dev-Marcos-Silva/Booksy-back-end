import { FastifyInstance } from "fastify"
import { register } from "./register"
import { jwtVerify } from "../../middlewares/verify-jwt"

export function routersBooks(app: FastifyInstance){

    app.post('/book',{onRequest:[]}, register)

}