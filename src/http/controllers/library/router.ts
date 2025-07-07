import { FastifyInstance } from "fastify";
import { create } from "./create";
import { profile } from "./profile";
import { avatar } from "./avatar";
import { update } from "./update";
import { jwtVerify } from "../../middlewares/verify-jwt";
import { verifyAccountRole } from "../../middlewares/verify-account-role";
import { updateImage } from "../../../config/update-image";
import { uploadImage } from "../../../config/upload-image";
import { deleteImage } from "../../../config/delete-image";

export function routersLibrary(app: FastifyInstance){

    app.post('/library/:id',{onRequest: [jwtVerify], preValidation: [deleteImage('profile'), uploadImage('library')]}, create)

    app.get('/library/profile',{onRequest: [jwtVerify]}, profile)

    app.patch('/library/avatar/:id',{onRequest: [jwtVerify, verifyAccountRole], preValidation: updateImage('library')}, avatar)

    app.put('/library/update',{onRequest: [jwtVerify, verifyAccountRole]}, update)
}