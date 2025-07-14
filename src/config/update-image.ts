import { FastifyReply, FastifyRequest } from "fastify";
import { pipeline } from "stream/promises";
import path from "path";
import fs from "fs";

export function updateImage(folder: string){

    return async function(request: FastifyRequest, reply: FastifyReply){

        const { id }= request.params as { id: string}
        const image = await request.file()

        if(!id){
            return reply.status(400).send({message: 'Id not found.'})
        }

        if(image?.mimetype === 'image'){
            return reply.status(400).send({message: 'File must be an image'})
        }
        
        const uploadDir = path.resolve(__dirname, `../../upload/${folder}`)
        
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        
        const fieldname = `${id}.png`
        const filePath = path.join(uploadDir, fieldname)
        
        if(!image){
            return reply.status(400).send({message: 'File must be an image'})
        }
        
        await pipeline(image.file, fs.createWriteStream(filePath))
        
        request.image = fieldname 
    }
} 