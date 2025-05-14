import fastify from 'fastify';
import { env } from './env/index.js';
import { routersUsers } from './http/controllers/users/router.js';

const app = fastify()

app.register(routersUsers)


app.listen({ port: env.PORT}).then(() => {
    console.log('Server is ruinning')
})