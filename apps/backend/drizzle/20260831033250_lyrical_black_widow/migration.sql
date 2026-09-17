CREATE TYPE "asset_type" AS ENUM('stock', 'crypto', 'etf', 'commodity', 'bond', 'real_estate', 'other');--> statement-breakpoint
CREATE TYPE "transaction_type" AS ENUM('buy', 'sell');--> statement-breakpoint
CREATE TYPE "cash_flow_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TYPE "trade_side" AS ENUM('long', 'short');--> statement-breakpoint
CREATE TYPE "trade_status" AS ENUM('open', 'closed', 'cancelled');--> statement-breakpoint
CREATE TABLE "asset_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"portfolio_id" uuid NOT NULL,
	"asset_id" uuid NOT NULL,
	"platform_id" uuid NOT NULL,
	"type" "transaction_type" NOT NULL,
	"quantity" numeric(20,8) NOT NULL,
	"price" numeric(20,8) NOT NULL,
	"fee" numeric(20,8) DEFAULT '0' NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"category" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"symbol" text NOT NULL,
	"type" "asset_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assets_symbol_type_unique" UNIQUE("symbol","type")
);
--> statement-breakpoint
CREATE TABLE "cash_flows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"category_id" uuid,
	"type" "cash_flow_type" NOT NULL,
	"amount" numeric(20,8) NOT NULL,
	"description" text,
	"date" timestamp with time zone NOT NULL,
	"frequency" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_user_id_name_unique" UNIQUE("user_id","name")
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "platforms_user_id_name_unique" UNIQUE("user_id","name")
);
--> statement-breakpoint
CREATE TABLE "portfolios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"portfolio_id" uuid NOT NULL,
	"symbol" text NOT NULL,
	"side" "trade_side" NOT NULL,
	"status" "trade_status" DEFAULT 'open'::"trade_status" NOT NULL,
	"entry" numeric(20,8) NOT NULL,
	"stop_loss" numeric(20,8) NOT NULL,
	"take_profit" numeric(20,8) NOT NULL,
	"leverage" integer NOT NULL,
	"margin" numeric(20,8) NOT NULL,
	"opened_at" timestamp with time zone NOT NULL,
	"closed_at" timestamp with time zone,
	"close_price" numeric(20,8),
	"net_pnl" numeric(20,8),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "asset_transactions" ADD CONSTRAINT "asset_transactions_portfolio_id_portfolios_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id");--> statement-breakpoint
ALTER TABLE "asset_transactions" ADD CONSTRAINT "asset_transactions_asset_id_assets_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id");--> statement-breakpoint
ALTER TABLE "asset_transactions" ADD CONSTRAINT "asset_transactions_platform_id_platforms_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id");--> statement-breakpoint
ALTER TABLE "cash_flows" ADD CONSTRAINT "cash_flows_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "cash_flows" ADD CONSTRAINT "cash_flows_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_portfolio_id_portfolios_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id");