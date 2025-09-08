import { FastifyInstance } from "fastify";
import { register } from "./register";
import { favorite } from "./favorite";
import { deleteFavorite } from "./delete";
import { jwtVerify } from "../../middlewares/verify-jwt";

export function routersFavorite(app: FastifyInstance){

   app.post('/favorite/register',{onRequest: [jwtVerify]}, register)

   app.get('/favorite/get/:id',{onRequest: [jwtVerify]}, favorite)

   app.delete('/favorite/delete',{onRequest: [jwtVerify]}, deleteFavorite)
}