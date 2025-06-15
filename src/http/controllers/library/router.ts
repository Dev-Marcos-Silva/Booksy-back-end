import { FastifyInstance } from "fastify";
import { create } from "./create";

export function routersLibrary(app: FastifyInstance){

    app.post('/library', create)

}