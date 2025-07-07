import fastify from "fastify";

declare module 'fastify' {
    interface FastifyRequest{
        image?: string | null
}}