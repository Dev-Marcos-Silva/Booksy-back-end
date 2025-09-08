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

    app.get('/user/rented/book/:id',{onRequest: [jwtVerify]}, user)

    app.get('/user/history/:id',{onRequest: [jwtVerify]}, history)

    app.patch('/user/delete/:id',{onRequest: [jwtVerify]}, deleteHistory)

    app.get('/library/rented/book/:id',{onRequest: [jwtVerify, verifyAccountRole]}, library)

    app.put('/library/accept/:id',{onRequest: [jwtVerify, verifyAccountRole]}, accept)

    app.put('/library/deliver/:id',{onRequest: [jwtVerify, verifyAccountRole]}, deliver)

    app.put('/library/complete/:id',{onRequest: [jwtVerify, verifyAccountRole]}, complete)



}