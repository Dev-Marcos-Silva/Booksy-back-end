import { FastifyInstance } from "fastify";
import { createUser } from "./createUser.js";

export function routersUsers(app: FastifyInstance){

    app.post('/user', createUser)

}