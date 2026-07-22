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
import { platforms, portfolios } from './portfolio.schema'

export const assetTypeEnum = pgEnum('asset_type', [
  'stock',
  'crypto',
  'etf',
  'commodity',
  'bond',
  'real_estate',
  'other',
])

export const assets = snakeCase.table(
  'assets',
  {
    id: uuid().defaultRandom().primaryKey(),
    symbol: text().notNull(),
    type: assetTypeEnum().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.symbol, t.type)],
)

export const transactionTypeEnum = pgEnum('transaction_type', ['buy', 'sell'])

export const assetTransactions = snakeCase.table('asset_transactions', {
  id: uuid().defaultRandom().primaryKey(),
  portfolioId: uuid()
    .notNull()
    .references(() => portfolios.id),
  assetId: uuid()
    .notNull()
    .references(() => assets.id),
  platformId: uuid()
    .notNull()
    .references(() => platforms.id),
  type: transactionTypeEnum().notNull(),
  quantity: numeric({ precision: 20, scale: 8 }).notNull(),
  price: numeric({ precision: 20, scale: 8 }).notNull(),
  fee: numeric({ precision: 20, scale: 8 }).notNull().default('0'),
  date: timestamp({ withTimezone: true }).notNull(),
  category: text(),
  ...timestamps,
})
