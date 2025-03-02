import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../_errors/bad-request-error";

export async function getPost(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/post/:slug",
    {
      schema: {
        tags: ["post"],
        summary: "Get post",
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            author: z.string(),
            title: z.string(),
            summary: z.string(),
            content: z.string().nullable(),
            status: z.string(),
            url: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            user: z.object({
              firstName: z.string(),
              lastName: z.string(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params;
      const post = await prisma.post.findFirst({
        where: { url: slug },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      if (!post) {
        throw new BadRequestError('Post not found')
      }

      return reply.status(200).send(post);
    }
  );
}
