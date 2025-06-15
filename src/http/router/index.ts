import { FastifyInstance } from "fastify";
import { routersUsers } from "../controllers/users/router";
import { routersLibrary } from "../controllers/library/router";
import { routerSession } from "../controllers/account/router";
import { routersRentedBook } from "../controllers/rented/router";

export function routers(app: FastifyInstance){

    routerSession(app)
    routersUsers(app)
    routersLibrary(app)
    routersRentedBook(app)
    
    
}