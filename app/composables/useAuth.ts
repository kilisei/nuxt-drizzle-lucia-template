import type { DeleteUserSchema, LoginSchema, SignupSchema } from '@db'
import { consola } from 'consola'

export function useAuth() {
  const { trpc } = useTrpc()
  const error = ref()

  async function signup(body: SignupSchema) {
    try {
      await trpc.user.signUp.mutate(body)
      await navigateTo('/')
    }
    catch (err: any) {
      error.value = err
      consola.error(err)
    }
  }

  async function login(body: LoginSchema) {
    try {
      await trpc.user.login.mutate(body)
      await navigateTo('/')
    }
    catch (err: any) {
      error.value = err
      consola.error(err)
    }
  }

  async function logout() {
    await trpc.user.logout.mutate()
    await navigateTo('/auth/login')
  }

  async function deleteUser(body: DeleteUserSchema) {
    try {
      await trpc.user.delete.mutate(body)
      await navigateTo('/auth/login')
    }
    catch (err: any) {
      error.value = err
      consola.error(err)
    }
  }

  return {
    login,
    deleteUser,
    signup,
    logout,
    error,
  }
}
