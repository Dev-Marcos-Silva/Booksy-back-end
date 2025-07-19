import { FastifyInstance } from "fastify";
import { register } from "./register";
import { assessments } from "./assessments";
import { jwtVerify } from "../../middlewares/verify-jwt";

export function routersAssessment(app: FastifyInstance){

    app.post('/assessment/register',{onRequest: [jwtVerify]}, register)
    
    app.get('/assessment/get/:id',{onRequest: [jwtVerify]}, assessments)
}