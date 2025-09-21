import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply){

    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
        return reply.status(401).send({ error: "No refresh token" });
    }

    await request.jwtVerify({
        onlyCookie: true
    })

    const { role } = request.user

    const token = await reply.jwtSign(
        {
            role
        },
        {
            sign:{
                sub: request.user.sub,
                expiresIn: '20sec'
            }
        }
    )

    const newRefreshToken = await reply.jwtSign(
        {
            role
        },
        {
            sign:{
                sub: request.user.sub,
                expiresIn: '7d'
            }
        }
    )

    return reply
        .setCookie('refreshToken', newRefreshToken, {
            path: '/',
            secure: true,
            sameSite: "none",
            httpOnly: true
        })
        .status(200)
        .send({token})
}