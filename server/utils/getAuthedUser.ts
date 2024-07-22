import { user } from '@db'
import { eq } from 'drizzle-orm'
import { verify } from '@node-rs/argon2'
import type { User } from 'lucia'

export async function getAuthedUser(db: any, username: string, password: string): Promise<User> {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.username, username),
  })

  if (!existingUser) {
    throw createError({
      statusCode: 403,
      message: 'Incorrect username or password',
    })
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  if (!validPassword) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 403,
    })
  }
  return existingUser
}
