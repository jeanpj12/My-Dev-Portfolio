import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    server: {
        SERVER_PORT: z.coerce.number().default(3333),
        DATABASE_URL: z.string().url(),
        JWT_SECRET: z.string(),
    },
    client: {},
    shared: {
        NEXT_PUBLIC_API_URL: z.string().url(),
    },
    runtimeEnv: {
        SERVER_PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    emptyStringAsUndefined: true,
});
