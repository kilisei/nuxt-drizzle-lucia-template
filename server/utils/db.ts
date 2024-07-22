import { env } from 'node:process'
import { drizzle } from 'drizzle-orm/postgres-js'
import consola from 'consola'
import type { LogWriter } from 'drizzle-orm/logger'
import { DefaultLogger } from 'drizzle-orm/logger'
import postgres from 'postgres'
import * as schema from '../database/schema'

class ConsolaLogger implements LogWriter {
  write(message: string) {
    consola.info(
      new Date().toLocaleTimeString('de'),
      '\n',
      message,
      '\n',
    )
  }
}

const logger = new DefaultLogger({ writer: new ConsolaLogger() })

// @ts-expect-error yeah it can be but we will see
const client = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DB,
})

export function useDB() {
  return drizzle(client, { schema, logger })
}
