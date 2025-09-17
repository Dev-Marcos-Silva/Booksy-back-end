import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { fastifyCors } from '@fastify/cors'
import { join } from 'path';
import { env } from './env/index';
import { routers } from './http/router';

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
    root: join(__dirname, '..','upload'),
    prefix: '/upload',
})

app.register(routers)

app.listen({ port: env.PORT}).then(() => {
    console.log('Server is ruinning')
})