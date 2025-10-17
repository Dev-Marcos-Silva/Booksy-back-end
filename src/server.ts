import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { fastifyCors } from '@fastify/cors'
import path, { join } from 'path';
import { env } from './env/index';
import { routers } from './http/router';
import { number } from 'zod';

const app = fastify()

app.register(fastifyCors,{
    origin: env.CONNECTION_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
})

app.register(fastifyCookie)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    }
})

app.register(multipart)

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../upload'),
    prefix: '/upload',
})

app.register(routers)

const port = process.env.PORT? Number(process.env.PORT): env.PORT

app.listen({ port, host: "0.0.0.0" }).then(() => {
    console.log('Server is ruinning')
})