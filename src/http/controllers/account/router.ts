import { FastifyInstance } from "fastify";
import { session } from "./session";
import { refresh } from "./refresh";

export function routerSession(app: FastifyInstance){

    app.post('/session', session)

    app.patch('/refresh/token', refresh)

}