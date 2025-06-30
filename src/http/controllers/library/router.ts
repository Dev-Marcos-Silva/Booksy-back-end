import { FastifyInstance } from "fastify";
import { create } from "./create";
import { profile } from "./profile";
import { jwtVerify } from "../../middlewares/verify-jwt";

export function routersLibrary(app: FastifyInstance){

    app.post('/library', create)

    app.get('/library/profile',{onRequest: [jwtVerify]}, profile)
}