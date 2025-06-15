import { FastifyInstance } from "fastify";
import { create } from "./create";

export function routersUsers(app: FastifyInstance){

    app.post('/user', create)

}