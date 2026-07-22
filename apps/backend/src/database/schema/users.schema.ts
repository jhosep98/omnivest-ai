import { snakeCase, text, uuid } from 'drizzle-orm/pg-core'
import { timestamps } from './_shared'

export const users = snakeCase.table('users', {
  id: uuid().defaultRandom().primaryKey(),
  email: text().notNull().unique(),
  ...timestamps,
})
