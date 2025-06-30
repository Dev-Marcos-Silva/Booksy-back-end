import fastify from 'fastify';
import { env } from './env/index';
import { routers } from './http/router';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie:{
        cookieName: 'refreshToken',
        signed: false
    }
})  

app.register(routers)

app.listen({ port: env.PORT}).then(() => {
    console.log('Server is ruinning')
})