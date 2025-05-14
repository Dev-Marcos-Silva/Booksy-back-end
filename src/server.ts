import fastify from 'fastify';
import { env } from './env/index.js';

const app = fastify()

app.get('/', (request, reply) => {

    reply.status(200).send(
        'Hello, World'
    )
    
})

app.listen({ port: env.PORT}).then(() => {
    console.log('Server is ruinning')
})