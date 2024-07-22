import { Lucia, TimeSpan } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { type User, session, user } from '@db'

const adapter = new DrizzlePostgreSQLAdapter(useDB(), session, user)

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, 'm'),
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      role: attributes.role,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<User, 'id'>
  }
}
