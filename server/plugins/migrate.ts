import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

export default defineNitroPlugin(() => {
  if (import.meta.dev)
    return

  migrate(useDB(), { migrationsFolder: 'migrations' })
})
