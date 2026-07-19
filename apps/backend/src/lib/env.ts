import path from 'node:path'
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

expand(
  config({
    path: path.resolve(process.cwd(), '../../.env'),
  }),
)

export const env = envSchema.parse(process.env)
