import { Lucia, TimeSpan } from 'lucia'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { type User, session, user } from '@db'

// @ts-expect-error idk why its drunk
const adapter = new DrizzleSQLiteAdapter(useDB(), session, user)

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(4, 'w'),
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
