import {
  numeric,
  pgEnum,
  snakeCase,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'
import { timestamps } from './_shared'
import { users } from './users.schema'

export const categories = snakeCase.table(
  'categories',
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

export const cashFlowTypeEnum = pgEnum('cash_flow_type', ['income', 'expense'])

export const cashFlows = snakeCase.table('cash_flows', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  categoryId: uuid().references(() => categories.id),
  type: cashFlowTypeEnum().notNull(),
  amount: numeric({ precision: 20, scale: 8 }).notNull(),
  description: text(),
  date: timestamp({ withTimezone: true }).notNull(),
  frequency: text(),
  ...timestamps,
})
