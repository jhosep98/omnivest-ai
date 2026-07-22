import {
  integer,
  numeric,
  pgEnum,
  snakeCase,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { timestamps } from './_shared'
import { portfolios } from './portfolio.schema'

export const tradeSideEnum = pgEnum('trade_side', ['long', 'short'])

export const tradeStatusEnum = pgEnum('trade_status', [
  'open',
  'closed',
  'cancelled',
])

export const trades = snakeCase.table('trades', {
  id: uuid().defaultRandom().primaryKey(),
  portfolioId: uuid()
    .notNull()
    .references(() => portfolios.id),
  symbol: text().notNull(),
  side: tradeSideEnum().notNull(),
  status: tradeStatusEnum().notNull().default('open'),
  entry: numeric({ precision: 20, scale: 8 }).notNull(),
  stopLoss: numeric({ precision: 20, scale: 8 }).notNull(),
  takeProfit: numeric({ precision: 20, scale: 8 }).notNull(),
  leverage: integer().notNull(),
  margin: numeric({ precision: 20, scale: 8 }).notNull(),
  openedAt: timestamp({ withTimezone: true }).notNull(),
  closedAt: timestamp({ withTimezone: true }),
  closePrice: numeric({ precision: 20, scale: 8 }),
  netPnl: numeric({ precision: 20, scale: 8 }),
  notes: text(),
  ...timestamps,
})
