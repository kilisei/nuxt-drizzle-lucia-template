import { env } from 'node:process'
import { type Config, defineConfig } from 'drizzle-kit'

// @ts-expect-error fix later;
export default defineConfig({
  schema: './server/database/schema',
  out: './server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    ssl: false,
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DB,
  },
}) satisfies Config
