import fastify from "fastify";

declare module 'fastify' {
    interface FastifyRequest{
        avatar?: string | null
}}