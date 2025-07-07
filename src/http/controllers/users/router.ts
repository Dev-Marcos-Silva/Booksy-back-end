import { FastifyInstance } from "fastify";
import { create } from "./create";
import { profile } from "./profile";
import { avatar } from "./avatar";
import { update } from "./update";
import { jwtVerify } from "../../middlewares/verify-jwt";
import { updateImage } from "../../../config/update-image";

export function routersUsers(app: FastifyInstance){

    app.post('/user', create)

    app.get('/user/profile',{ onRequest: [jwtVerify]}, profile)
    // preValidation: manipular a request antes de ir para os controllers
    app.patch('/user/avatar/:id',{ onRequest: [jwtVerify], preValidation: updateImage('profile')}, avatar)

    app.put('/user/update',{ onRequest: [jwtVerify]}, update)
}