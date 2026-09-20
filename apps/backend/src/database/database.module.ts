import { Global, Module, OnModuleDestroy } from '@nestjs/common'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/lib/env'
import { relations } from './schema'

export type DatabaseConnection = NodePgDatabase<typeof relations>

export const DATABASE_CONNECTION_TOKEN = Symbol('DATABASE_CONNECTION_TOKEN')

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: Pool,
      useFactory: () => {
        const pool = new Pool({
          connectionString: env.DATABASE_URL,
        })

        return pool
      },
    },
    {
      provide: DATABASE_CONNECTION_TOKEN,
      useFactory: (pool: Pool) => {
        const db = drizzle({ client: pool, relations })

        return db
      },
      inject: [Pool],
    },
  ],
  exports: [DATABASE_CONNECTION_TOKEN],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(private readonly pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end()
  }
}
