import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '~~/server/database/schema'

export function useDB() {
  return drizzle(new Database('sqlite.db'), { schema })
}
