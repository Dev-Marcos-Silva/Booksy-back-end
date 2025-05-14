import fastify from 'fastify';
import { env } from './env/index';
import { routersUsers } from './http/controllers/users/router';

const app = fastify()

app.register(routersUsers)


app.listen({ port: env.PORT}).then(() => {
    console.log('Server is ruinning')
})