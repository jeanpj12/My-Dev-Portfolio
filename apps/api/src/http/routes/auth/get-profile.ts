import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../_errors/bad-request-error";
import { auth } from "@/http/middlewares/auth";
import { Role } from "@prisma/client";

export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      "/profile",
      {
        schema: {
          tags: ["auth"],
          summary: "Get authenticated user profile.",
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                firstName: z.string(),
                lastName: z.string(),
                role: z.nativeEnum(Role),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        });

        if (!user) {
          throw new BadRequestError("User not found");
        }
        return reply.send({ user });
      }
    );
}
