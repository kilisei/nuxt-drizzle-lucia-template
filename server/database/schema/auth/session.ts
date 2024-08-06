import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './index'

export const session = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: integer('expiresAt').notNull(),
  userId: text('userId').notNull().references(() => user.id),
})

export const insertSessionSchema = createInsertSchema(session)
export const selectSessionSchema = createSelectSchema(session)

export type Session = z.infer<typeof selectSessionSchema>
export type NewSession = z.infer<typeof insertSessionSchema>
