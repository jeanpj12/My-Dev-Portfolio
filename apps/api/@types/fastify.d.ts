import "fastify";
import { Game, GamePlayer } from "@prisma/client";

declare module "fastify" {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>;
  }
}
