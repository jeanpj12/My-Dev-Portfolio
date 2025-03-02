import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { hash } from "bcrypt";
import { BadRequestError } from "../_errors/bad-request-error";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth/create",
    {
      schema: {
        tags: ["auth"],
        summary: "Create a new account",
        body: z.object({
          firstName: z.string().min(3).trim(),
          lastName: z.string().min(3).trim(),
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email, firstName, lastName, password } = request.body;

      const userSameEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (userSameEmail) {
        throw new BadRequestError("Email already registered.");
      }

      const passwordHash = await hash(password, 6);

      await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          passwordHash,
        },
      });

      return reply.status(201).send();
    }
  );
}
