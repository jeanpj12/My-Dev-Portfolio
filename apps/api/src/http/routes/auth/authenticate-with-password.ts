import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../_errors/bad-request-error";

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sessions",
    {
      schema: {
        tags: ["auth"],
        summary: "Authenticate with email and password",
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequestError("Invalid credentials.");
      }

      const isPasswordValid = await compare(password, user.passwordHash);

      if (!isPasswordValid) {
        throw new BadRequestError("Invalid credentials.");
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: "14d",
          },
        }
      );

      return reply.status(201).send({ token });
    }
  );
}
