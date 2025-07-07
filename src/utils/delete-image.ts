import path from "path"
import fs from "fs"

export function deleteImageAfterError(folder: string, id: string){

    const filename = `${id}.png`

    const filePath = path.resolve(__dirname,`../../upload/${folder}/${filename}`)

    if(fs.existsSync(filePath)){

        fs.unlinkSync(filePath)
    } 
} 