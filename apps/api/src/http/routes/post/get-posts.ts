import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getPosts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/post",
    {
      schema: {
        tags: ["post"],
        summary: "Get posts",
        response: {
          200: z.array(
            z.object({
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
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const posts = await prisma.post.findMany({
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return reply.status(200).send(posts);
    }
  );
}
