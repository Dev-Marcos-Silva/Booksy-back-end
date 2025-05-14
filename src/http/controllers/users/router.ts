import { FastifyInstance } from "fastify";
import { createUser } from "./createUser";

export function routersUsers(app: FastifyInstance){

    app.post('/user', createUser)

}