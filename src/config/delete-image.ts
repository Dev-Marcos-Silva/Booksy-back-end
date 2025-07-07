import { FastifyRequest } from "fastify"
import path from "path"
import fs from "fs"

export function deleteImage(folder: string){

   return async function(request: FastifyRequest){

        const { id } = request.params as { id: string}
        
        const filename = `${id}.png`

        const filePath = path.resolve(__dirname,`../../upload/${folder}/${filename}`)

        if(fs.existsSync(filePath)){

            fs.unlinkSync(filePath)
        }
    }
} 