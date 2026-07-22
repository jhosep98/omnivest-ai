import { snakeCase, text, unique, uuid } from 'drizzle-orm/pg-core'
import { timestamps } from './_shared'
import { users } from './users.schema'

export const portfolios = snakeCase.table('portfolios', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .unique()
    .references(() => users.id),
  ...timestamps,
})

export const platforms = snakeCase.table(
  'platforms',
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    name: text().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.userId, t.name)],
)
