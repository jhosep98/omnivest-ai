import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

const envSchema = z.object({
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  REDIS_PASSWORD: z.string().min(1),
})

expand(config())

export const env = envSchema.parse(process.env)
