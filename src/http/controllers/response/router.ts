import { FastifyInstance } from "fastify"
import { register } from "./register"
import { verifyAccountRole } from "../../middlewares/verify-account-role"
import { jwtVerify } from "../../middlewares/verify-jwt"
import { response } from "./responses"

export function routersReponse(app: FastifyInstance){

    app.post('/library/response',{onRequest: [jwtVerify, verifyAccountRole]}, register)

    app.get('/library/response/:id',{onRequest: [jwtVerify]}, response )

} 