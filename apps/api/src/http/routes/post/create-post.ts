import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { auth } from "@/http/middlewares/auth";
import { StatusPost } from "@prisma/client";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { generateUniqueSlug } from "@/utils/url-generate";

export async function createPost(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      "/post",
      {
        schema: {
          tags: ["post"],
          summary: "Create a new post",
          security: [{ bearerAuth: [] }],
          body: z.object({
            title: z.string(),
            summary: z.string(),
            content: z.any(),
            status: z.nativeEnum(StatusPost),
          }),
          response: {
            201: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { content, status, summary, title } = request.body;
        const authorId = await request.getCurrentUserId();

        const url = await generateUniqueSlug(title);

        const userRole = await prisma.user.findUnique({
          where: {
            id: authorId,
          },
        });

        if (userRole?.role !== "author") {
          throw new UnauthorizedError(
            "You do not have authorization to publish posts"
          );
        }

        await prisma.post.create({
          data: {
            author: authorId,
            title,
            summary,
            content: JSON.stringify(content),
            status,
            url
          },
        });

        return reply.status(201).send();
      }
    );
}
