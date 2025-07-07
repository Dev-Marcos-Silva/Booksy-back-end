import { FastifyReply, FastifyRequest } from "fastify"
import path from "path"
import fs from "fs"

export function deleteImage(folder: string){

   return async function(request: FastifyRequest, reply: FastifyReply){

        const { id } = request.params as { id: string}

        if(!id){
            return reply.status(400).send({message: 'Id not found.'})
        }
        
        const filename = `${id}.png`

        const filePath = path.resolve(__dirname,`../../upload/${folder}/${filename}`)

        if(fs.existsSync(filePath)){

            fs.unlinkSync(filePath)
        }
    }
} 