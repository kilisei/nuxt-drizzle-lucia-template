import { env } from 'node:process'
import { type Config, defineConfig } from 'drizzle-kit'

// @ts-expect-error fix later;
export default defineConfig({
  schema: './server/database/schema',
  out: './server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    ssl: false,
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
  },
}) satisfies Config
