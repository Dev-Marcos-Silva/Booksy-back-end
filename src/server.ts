import fastify from 'fastify';
import { env } from './env/index';
import { routers } from './http/router';

const app = fastify()

app.register(routers)

app.listen({ port: env.PORT}).then(() => {
    console.log('Server is ruinning')
})