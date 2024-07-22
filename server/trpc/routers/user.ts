import { changePasswordSchema, deleteUserSchema, loginSchema, selectUserSchema, session, signupSchema, user } from '@db'
import { eq } from 'drizzle-orm'
import { hash } from '@node-rs/argon2'
import { generateIdFromEntropySize } from 'lucia'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const userRouter = router({
  me: protectedProcedure
    .output(selectUserSchema.omit({ passwordHash: true }))
    .query(({ ctx }) => {
      const { user } = ctx

      return user
    }),

  all: protectedProcedure
    .output(selectUserSchema
      .omit({ passwordHash: true })
      .array())
    .query(async ({ ctx }) => {
      const { db } = ctx

      return await db.query.user.findMany({
        columns: {
          passwordHash: false,
        },
      })
    }),

  deleteAll: protectedProcedure
    .mutation(async ({ ctx }) => {
      const { db } = ctx

      await db.delete(session)
      await db.delete(user)
    }),

  signUp: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, setCookie } = ctx
      const { username, password, email } = input

      const userId = generateIdFromEntropySize(16)

      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })

      const [newUser] = await db
        .insert(user)
        .values({
          id: userId,
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

  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, setCookie, session } = ctx
      const { password, newPassword } = input

      const authedUser = await getAuthedUser(db, ctx.user.username, password)

      const passwordHash = await hash(newPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })

      db
        .update(user)
        .set({
          passwordHash,
        })
        .where(eq(user.username, authedUser.username))

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
