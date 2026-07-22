import { defineRelations } from 'drizzle-orm'
import { assets, assetTransactions } from './assets.schema'
import { cashFlows, categories } from './cashflow.schema'
import { platforms, portfolios } from './portfolio.schema'
import { trades } from './trading.schema'
import { users } from './users.schema'

export * from './assets.schema'
export * from './cashflow.schema'
export * from './portfolio.schema'
export * from './trading.schema'
export * from './users.schema'

const schema = {
  users,
  portfolios,
  platforms,
  assets,
  assetTransactions,
  categories,
  cashFlows,
  trades,
}

export const relations = defineRelations(schema, (r) => ({
  portfolios: {
    user: r.one.users({
      from: r.portfolios.userId,
      to: r.users.id,
    }),
    assetTransactions: r.many.assetTransactions(),
    trades: r.many.trades(),
  },
  platforms: {
    user: r.one.users({
      from: r.platforms.userId,
      to: r.users.id,
    }),
    assetTransactions: r.many.assetTransactions(),
  },
  categories: {
    user: r.one.users({
      from: r.categories.userId,
      to: r.users.id,
    }),
    cashFlows: r.many.cashFlows({
      from: r.categories.id,
      to: r.cashFlows.categoryId,
    }),
  },
  cashFlows: {
    user: r.one.users({
      from: r.cashFlows.userId,
      to: r.users.id,
    }),
    category: r.one.categories({
      from: r.cashFlows.categoryId,
      to: r.categories.id,
    }),
  },
  assetTransactions: {
    portfolio: r.one.portfolios({
      from: r.assetTransactions.portfolioId,
      to: r.portfolios.id,
    }),
    asset: r.one.assets({
      from: r.assetTransactions.assetId,
      to: r.assets.id,
    }),
    platform: r.one.platforms({
      from: r.assetTransactions.platformId,
      to: r.platforms.id,
    }),
  },
  trades: {
    portfolio: r.one.portfolios({
      from: r.trades.portfolioId,
      to: r.portfolios.id,
    }),
  },
  users: {
    portfolio: r.one.portfolios({
      from: r.users.id,
      to: r.portfolios.userId,
    }),
    platforms: r.many.platforms(),
    categories: r.many.categories(),
    cashFlows: r.many.cashFlows(),
  },
  assets: {
    assetTransactions: r.many.assetTransactions(),
  },
}))
