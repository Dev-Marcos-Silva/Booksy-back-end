import { FastifyInstance } from "fastify";
import { routersUsers } from "../controllers/users/router";
import { routersLibrary } from "../controllers/library/router";
import { routerSession } from "../controllers/account/router";
import { routersRentedBook } from "../controllers/rented/router";
import { routersReponse } from "../controllers/response/router";
import { routersBooks } from "../controllers/book/router";
import { routersFavorite } from "../controllers/favorite/router";
import { routersComments } from "../controllers/comment/router";
import { routersAssessment } from "../controllers/assessment/router";

export function routers(app: FastifyInstance){

    routerSession(app)
    routersUsers(app)
    routersLibrary(app)
    routersBooks(app)
    routersRentedBook(app)
    routersReponse(app)
    routersFavorite(app)
    routersComments(app)
    routersAssessment(app)
}