import 'dotenv/config'
import { z } from 'zod'

const schemaEnv = z.object({
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    CONNECTION_ORIGIN: z.string().default("http://localhost:5173")
})

const _env = schemaEnv.safeParse(process.env)

if(_env.success === false){
    console.error('❌ Invalid enviromente variables', _env.error.format())

    throw new Error('❌ Invalid enviromente variables')
}

export const env = _env.data