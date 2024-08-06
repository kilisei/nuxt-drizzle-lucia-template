import { type Config, defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/database/schema',
  out: './server/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
}) satisfies Config
