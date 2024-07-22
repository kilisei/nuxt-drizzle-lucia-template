import { user } from '@db'
import { eq } from 'drizzle-orm'
import { Argon2id } from 'oslo/password'
import type { User } from 'lucia'

const argon2id = new Argon2id()

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

  const validPassword = await argon2id.verify(existingUser.passwordHash, password)

  if (!validPassword) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 403,
    })
  }
  return existingUser
}
