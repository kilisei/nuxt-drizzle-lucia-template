import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '~~/server/database/schema'

export function useDB() {
  const db = new Database('sqlite.db')
  return drizzle(db, { schema })
}
