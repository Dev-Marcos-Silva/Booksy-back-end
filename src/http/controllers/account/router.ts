import { FastifyInstance } from "fastify";
import { session } from "./session";

export function routerSession(app: FastifyInstance){

    app.post('/session', session)

}