import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    server: {
        PORT: z.coerce.number().default(3333),

        DATABASE_URL: z.string().url(),

        JWT_SECRET: z.string(),

    },
    client: {},
    shared: {},
    runtimeEnv: {
        PORT: process.env.SERVER_PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
    },
    emptyStringAsUndefined: true,
});
