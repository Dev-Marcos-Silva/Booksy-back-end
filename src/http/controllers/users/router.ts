import { FastifyInstance } from "fastify";
import { create } from "./create";
import { profile } from "./profile";
import { avatar } from "./avatar";
import { update } from "./update";
import { jwtVerify } from "../../middlewares/verify-jwt";
import { updateImage } from "../../../config/update-image";
import { address } from "./address";

export function routersUsers(app: FastifyInstance){

    app.post('/user', create)

    app.get('/user/profile/:id',{ onRequest: [jwtVerify]}, profile)
    
    app.patch('/user/update/:id',{ onRequest: [jwtVerify]}, update)

    app.post('/user/address/:id',{ onRequest: [jwtVerify]}, address)
    // preValidation: manipular a request antes de ir para os controllers
    app.patch('/user/avatar/:id',{ onRequest: [jwtVerify], preValidation: updateImage('profile')}, avatar)

}