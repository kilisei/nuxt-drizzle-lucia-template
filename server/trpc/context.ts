import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'

export async function createContext(event: H3Event) {
  return {
    db: useDB(),
    user: event.context.user,
    session: event.context.session,
    setCookie: (value: unknown) => appendHeader(event, 'Set-Cookie', value),
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
