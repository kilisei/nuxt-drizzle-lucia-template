import { TRPCError, initTRPC } from '@trpc/server'
import type { Context } from './context'

const t = initTRPC.context<Context>().create()

const authed = t.middleware(({ next, ctx }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session,
    },
  })
})

export const protectedProcedure = t.procedure.use(authed)
export const publicProcedure = t.procedure

export const router = t.router
