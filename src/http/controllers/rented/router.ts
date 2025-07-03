import { FastifyInstance } from "fastify";
import { register } from "./register";
import { user } from "./users";
import { library } from "./library";
import { accept } from "./accept";
import { deliver } from "./deliver";
import { complete } from "./complete";
import { history } from "./history";
import { deleteHistory } from "./delete";
import { verifyAccountRole } from "../../middlewares/verify-account-role";
import { jwtVerify } from "../../middlewares/verify-jwt";

export function routersRentedBook(app: FastifyInstance){

    app.post('/rented/book',{onRequest: [jwtVerify]}, register)

    app.get('/user/rented/book',{onRequest: [jwtVerify]}, user)

    app.get('/user/history',{onRequest: [jwtVerify]}, history)

    app.put('/user/delete',{onRequest: [jwtVerify]}, deleteHistory)

    app.get('/library/rented/book',{onRequest: [jwtVerify, verifyAccountRole]}, library)

    app.put('/library/accept',{onRequest: [jwtVerify, verifyAccountRole]}, accept)

    app.put('/library/deliver',{onRequest: [jwtVerify, verifyAccountRole]}, deliver)

    app.put('/library/complete',{onRequest: [jwtVerify, verifyAccountRole]}, complete)



}