import { FastifyReply, FastifyRequest } from "fastify";
import { pipeline } from "stream/promises";
import path from "path";
import fs from "fs"; 

export function updateImage(folder: string){

    return async function(request: FastifyRequest, reply: FastifyReply){

        // depois de instalar o @fastify/multipart, obter os dados do arquivo enviado
        const data = await request.file()
        const userId = request.user.sub


        // garante que só imagens sejam aceitas.
        if(!data?.mimetype.startsWith('image/')){

            return reply.status(400).send({message: 'File must be an image'})
        }

        // pegar a pasta/diretório com o path
        const uploadDir = path.resolve(__dirname, `../../upload/${folder}`)


        // verificar se existe o diretório, se não, criar com o fs
        if(!fs.existsSync(uploadDir)){
            // recursive: true -  cria toda a hierarquia de diretórios se não existir
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        // criar o nome do arquivo
        const filename = `${userId}.png`
        // montar o caminho completo do arquivo
        const filePath = path.join(uploadDir, filename)

        // transferir a imagem para o arquivo e diretório
        await pipeline(data.file, fs.createWriteStream(filePath))

        // retornar o nome do arquivo para o request (para salvar no banco)
        request.avatar = filename
    }
}
