import { defineConfig } from 'drizzle-kit'
import { env } from '@/lib/env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema/*.schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
