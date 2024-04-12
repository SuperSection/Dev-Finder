import { z } from "zod";


const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_GET_STREAM_API_KEY: z.string(),
  GET_STREAM_SECRET_KEY: z.string(),
});


export const env = envSchema.parse(process.env);