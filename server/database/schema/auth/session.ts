import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { user } from './user'

export const session = pgTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
  userId: text('userId').notNull().references(() => user.id),
})

export const insertSessionSchema = createInsertSchema(session)
export const selectSessionSchema = createSelectSchema(session)

export type Session = z.infer<typeof selectSessionSchema>
export type NewSession = z.infer<typeof insertSessionSchema>
