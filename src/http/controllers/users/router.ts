import { FastifyInstance } from "fastify";
import { create } from "./create";
import { profile } from "./profile";
import { avatar } from "./avatar";
import { update } from "./update";
import { jwtVerify } from "../../middlewares/verify-jwt";

export function routersUsers(app: FastifyInstance){

    app.post('/user', create)

    app.get('/user/profile',{onRequest: [jwtVerify]}, profile)

    app.patch('/user/avatar',{onRequest: [jwtVerify]}, avatar)

    app.put('/user/update',{onRequest: [jwtVerify]}, update)
}