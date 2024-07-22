import { deleteUserSchema, loginSchema, signupSchema, user } from '@db'
import { eq } from 'drizzle-orm'
import { Argon2id } from 'oslo/password'
import { generateIdFromEntropySize } from 'lucia'
import { protectedProcedure, publicProcedure, router } from '../trpc'

const argon2id = new Argon2id()

export const userRouter = router({
  signUp: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, setCookie } = ctx
      const { username, password, email } = input

      const passwordHash = await argon2id.hash(password)

      const [newUser] = await db
        .insert(user)
        .values({
          id: generateIdFromEntropySize(16),
          username,
          email,
          passwordHash,
        })
        .returning()

      if (!newUser) {
        throw createError({
          statusCode: 500,
          message: 'Could not create user',
        })
      }

      const session = await lucia.createSession(newUser.id, {})
      setCookie(lucia.createSessionCookie(session.id).serialize())
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, setCookie } = ctx
      const { username, password } = input

      const authedUser = await getAuthedUser(db, username, password)

      const session = await lucia.createSession(authedUser.id, {})
      setCookie(lucia.createSessionCookie(session.id).serialize())
    }),

  logout: protectedProcedure
    .mutation(async ({ ctx }) => {
      const { session, setCookie } = ctx

      await lucia.invalidateSession(session.id)
      setCookie(lucia.createBlankSessionCookie().serialize())
    }),

  delete: protectedProcedure
    .input(deleteUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, setCookie, session } = ctx
      const { password } = input

      await getAuthedUser(db, ctx.user.username, password)

      await lucia.invalidateSession(session.id)

      await db
        .delete(user)
        .where(
          eq(user.id, session.userId),
        )

      setCookie(lucia.createBlankSessionCookie().serialize())
    }),
})
