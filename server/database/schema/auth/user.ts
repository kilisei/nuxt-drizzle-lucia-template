import { pgTable, text } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const user = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
  email: text('email').notNull().unique(),
  passwordHash: text('passwordHash').notNull(),
})

export const selectUserSchema = createSelectSchema(user)

export type User = z.infer<typeof selectUserSchema>

export const signupSchema = z.object({
  username: z.string().min(1, 'Username cannot be empty').max(128, 'Username cannot be longer than 128 characters'),
  password: z.string().min(1, 'Password cannot be empty').max(128, 'Password cannot be longer than 128 characters'),
  email: z.string().email('Must be a valid email'),
  repeatPassword: z.string().min(1, 'Repeat password cannot be empty').max(128, 'Repeat password cannot be longer than 128 characters'),
}).refine(data => data.password === data.repeatPassword, { message: 'Passwords do not match', path: ['repeatPassword'] })
export type SignupSchema = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  username: z.string().min(1, 'Username cannot be empty').max(128, 'Username cannot be longer than 128 characters'),
  password: z.string().min(1, 'Password cannot be empty').max(128, 'Password cannot be longer than 128 characters'),
})
export type LoginSchema = z.infer<typeof loginSchema>

export const changePasswordSchema = z.object({
  password: z.string().min(1, 'Password cannot be empty').max(128, 'Password cannot be longer than 128 characters'),
  newPassword: z.string().min(1, 'New password cannot be empty').max(128, 'New password cannot be longer than 128 characters'),
})
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export const deleteUserSchema = z.object({
  password: z.string().min(1, 'Password cannot be empty').max(128, 'Password cannot be longer than 128 characters'),
})
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>
