import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { errorHandler } from "./error-handler";
import fastifyJwt from "@fastify/jwt";
import { createAccount } from "./routes/auth/create-account";
import { authenticateWithPassword } from "./routes/auth/authenticate-with-password";
import { getProfile } from "./routes/auth/get-profile";
import { createPost } from "./routes/post/create-post";
import { getPosts } from "./routes/post/get-posts";
import { getPost } from "./routes/post/get-post";
import { env } from "@repo/env";


const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorHandler);

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Blog API",
      description: "Game table extension",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token here to access protected endpoints",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
});

app.register(createAccount);
app.register(authenticateWithPassword);
app.register(getProfile);

app.register(createPost);
app.register(getPosts);
app.register(getPost);

app.listen({ port: env.SERVER_PORT }).then(() => console.log("server is running"));
