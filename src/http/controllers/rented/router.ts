import { FastifyInstance } from "fastify";
import { register } from "./register";

export function routersRentedBook(app: FastifyInstance){

    app.post('/rented/book', register)

}