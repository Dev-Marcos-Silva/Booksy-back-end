import { MultipartFile } from "@fastify/multipart";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { pipeline } from "stream/promises";
import path from "path";
import fs from "fs";

export function uploadImage(folder: string){

    return async function(request: FastifyRequest, reply: FastifyReply){

        // criar um uuid 
        const id = randomUUID()

        // criar as variaves para armazenar a imagem e o json
        let image: MultipartFile | null = null
        let json: any = null

        // pecorre os campos do arquivo e json(em string) e retorna image e json
        for await (const part of request.parts()) {

            if(part.type === 'file' && part.fieldname === 'image'){
                // IMPORTANTE! dentro do if e recomendodo salva com o pipeline
                image = part

                if(image?.mimetype === 'image/'){
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
            else if(part.type === 'field' && part.fieldname === 'data' && typeof part.value === 'string'){
                // pega o texto e trasforma em JSON
                json = JSON.parse(part.value)

                request.body = json
                request.id = id
            }
        }
    }
}