import { deleteUserSchema, loginSchema, signupSchema, user } from '@db'
import { eq } from 'drizzle-orm'
import { hash } from '@node-rs/argon2'
import { generateIdFromEntropySize } from 'lucia'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const userRouter = router({
  signUp: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, setCookie } = ctx
      const { username, password, email } = input

      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })

      const id = generateIdFromEntropySize(16)
      
      console.log(input)

      const [newUser] = await db
        .insert(user)
        .values({
          id,
          username,
          email,
          passwordHash,
        })
        .returning()

      console.log(newUser)

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
