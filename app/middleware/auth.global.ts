export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()

  const userValues = await useRequestFetch()('/api/auth/user')

  if (userValues) {
    user.value = userValues
  }
})
