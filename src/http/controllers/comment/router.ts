import { FastifyInstance } from "fastify";
import { register } from "./register";
import { comments } from "./comments";
import { jwtVerify } from "../../middlewares/verify-jwt";

export function routersComments(app: FastifyInstance){

   app.post('/comment/register',{onRequest: [jwtVerify]}, register)

   app.get('/comment/get/:id',{onRequest: [jwtVerify]}, comments)
}