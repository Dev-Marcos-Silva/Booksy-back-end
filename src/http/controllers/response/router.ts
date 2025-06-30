import { FastifyInstance } from "fastify"
import { register } from "./register"
import { verifyAccountRole } from "../../middlewares/verify-account-role"
import { jwtVerify } from "../../middlewares/verify-jwt"

export function routersReponse(app: FastifyInstance){

    app.post('/library/reponse',{onRequest: [jwtVerify, verifyAccountRole]}, register)

} 